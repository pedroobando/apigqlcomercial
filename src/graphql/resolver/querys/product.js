const { Product } = require('../../../mongodb/models/product');
const { Document } = require('../../../mongodb/models/document');
const { ApolloError } = require('apollo-server-express');
const { isUserAuthenticate, retDataPaginate } = require('../middleware');

const querys = {
  getProduct: async (_, { productId }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const product = await Product.findById(productId);
    if (!product) throw new ApolloError(`El producto no existe`, '404');
    return product;
  },

  getProductCode: async (_, { code }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const product = await Product.findOne({ code: code });
    if (!product)
      throw new ApolloError(`El codigo ${code}, no esta asignado a ningún producto.`, '404');
    return product;
  },

  getProducts: async (_, { sortName = 'productName' }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      const listProducts = await Product.find({}).sort({ [sortName]: 1 });
      return listProducts;
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Productos');
    }
  },

  getProductQuantity: async (_, { productId }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const product = await Product.findById(productId);
    if (!product) throw new ApolloError(`El producto no existe`, '404');
    const documentos = await Document.find({});
    const pepe = documentos[0].details.id('621bdecd5edbeefe31553159');
    console.log(pepe);
    // let details=[]
    // let details = documentos.map((doc) => doc.details);
    // let pepe1 = details.map((item) => ({ productId: item.productId }));
    // console.log(pepe1);
    // const { details } = documentos[0];
    // console.log(documentos[0].details);

    return 3;
  },

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
