const Owner = require('../../../mongodb/models/owner');
const { ApolloError } = require('apollo-server-express');
const { isUserAuthenticate, retDataPaginate } = require('../middleware');

const querys = {
  getOwner: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const owner = await Owner.findById(id);
    if (!owner) throw new ApolloError('El propietario del inmueble no existente', '404');
    return owner;
  },

  getOwnerDni: async (_, { dni }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const owner = await Owner.find({ dni });
    if (!owner) throw new ApolloError('El propietario del inmueble no existente', '404');
    return owner;
  },

  getOwners: async (_, { condid, sortName = 'ownerName' }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      const listOwners = await Owner.find({ condominioId: condid }).sort({ [sortName]: 1 });
      return listOwners;
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Propietarios');
    }
  },

  getOwnersPaginate: async (
    _,
    { condid, page = 1, limit = 20, sortName = 'ownerName', sortASC = 1 },
    ctx
  ) => {
    const { uid } = await isUserAuthenticate(ctx);

    const options = {
      page,
      limit,
      sort: { [sortName]: sortASC },
      collation: {
        locale: 'en',
      },
    };

    try {
      const seekCondition = { condominioId: condid };
      const ownerPages = await Owner.paginate(seekCondition, options);

      const retData = {
        docs: [...ownerPages.docs],
        paginate: retDataPaginate(ownerPages),
      };

      return retData;
    } catch (error) {
      throw new ApolloError('Error paginando datos de los Propietarios');
    }
  },
};

module.exports = querys;
