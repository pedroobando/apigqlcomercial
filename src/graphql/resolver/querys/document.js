const { Document } = require('../../../mongodb/models/document');
const { ApolloError } = require('apollo-server-express');
const { isUserAuthenticate, retDataPaginate } = require('../middleware');

const querys = {
  getDocument: async (_, { documentId }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const document = await Document.findById(documentId);
    if (!document) throw new ApolloError(`El documento no existe`, '404');
    return document;
  },

  getDocuments: async (_, {}, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      const listDocuments = await Document.find({}).sort('docNumber');
      return listDocuments;
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Documentos');
    }
  },

  getDocumentsIn: async (_, { finished }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const docType = ['ENTRADA', 'COMPRA', 'DEVOLUCION'];
    try {
      const listDocuments = await Document.find({ docType: docType, finished: finished }).sort(
        'docNumber'
      );
      return listDocuments;
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Documentos');
    }
  },

  getDocumentsOut: async (_, { finished }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const docType = ['SALIDA', 'VENTA'];
    try {
      const listDocuments = await Document.find({ docType: docType, finished: finished }).sort(
        'docNumber'
      );
      return listDocuments;
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Documentos');
    }
  },

  // getProducts: async (_, { sortName = 'productName' }, ctx) => {
  //   const { uid } = await isUserAuthenticate(ctx);
  //   try {
  //     const listProducts = await Product.find({}).sort({ [sortName]: 1 });
  //     return listProducts;
  //   } catch (error) {
  //     throw new ApolloError('Error en obtener datos de los Productos');
  //   }
  // },

  getProductsActive: async (_, { sortName = 'productName' }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      const listProducts = await Product.find({ active: true }).sort({ [sortName]: 1 });
      return listProducts;
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Productos');
    }
  },

  getProductsPaginate: async (_, { page = 1, limit = 20, sortName = 'productName' }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    const options = {
      page,
      limit,
      sort: { [sortName]: 1 },
      collation: {
        locale: 'en',
      },
    };

    try {
      const seekCondition = {};
      const ownerPages = await Product.paginate(seekCondition, options);

      const retData = {
        docs: [...ownerPages.docs],
        paginate: retDataPaginate(ownerPages),
      };

      return retData;
    } catch (error) {
      throw new ApolloError('Error paginando datos de los Productos');
    }
  },
};

module.exports = querys;
