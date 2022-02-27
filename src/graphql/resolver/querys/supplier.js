const Supplier = require('../../../mongodb/models/supplier');
const { ApolloError } = require('apollo-server-express');
const { isUserAuthenticate, retDataPaginate } = require('../middleware');

const querys = {
  getSupplier: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const supplier = await Supplier.findById(id);
    if (!supplier) throw new ApolloError('El proveedor no existente', '404');
    return supplier;
  },

  getSuppliers: async (_, { condid }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      const listSuppliers = await Supplier.find({ condominioId: condid }).sort({
        'supplierName': 1,
      });
      return listSuppliers;
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Proveedores');
    }
  },

  getSuppliersPaginate: async (_, { condid, page = 1, limit = 20 }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    const options = {
      page,
      limit,
      sort: { 'supplierName': 1 },
      collation: {
        locale: 'en',
      },
    };

    try {
      const seekCondition = { condominioId: condid };
      const supplierPages = await Supplier.paginate(seekCondition, options);

      const retData = {
        docs: [...supplierPages.docs],
        paginate: retDataPaginate(supplierPages),
      };

      return retData;
    } catch (error) {
      throw new ApolloError('Error paginando datos de los Proveedores');
    }
  },
};

module.exports = querys;
