const Condominio = require('../../../mongodb/models/condominio');
const { AuthenticationError, ApolloError } = require('apollo-server-express');
const { isUserAuthenticate, isExistsCondominio } = require('../middleware');

const querys = {
  getCondominio: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const existCondominio = await isExistsCondominio(id);
    return existCondominio;
  },

  getCondominios: async (_, {}, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      let listCondominio = null;
      listCondominio = await Condominio.find({ users: uid }).sort({ name: 1 });
      return [...listCondominio];
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Condominios');
    }
  },

  getCondominiosActive: async (_, {}, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      let listCondominio = null;
      listCondominio = await Condominio.find({ users: uid, active: true }).sort('name');
      return [...listCondominio];
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Condominios');
    }
  },

  // getCondominiosbyUser: async (_, {}, ctx) => {
  //   if (!ctx.user) throw new AuthenticationError('not authenticated');
  //   const { sub: userId } = ctx.user;

  //   try {
  //     const listCondominios = await Condominio.find({ user_at: userId });
  //     return [...listCondominios];
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApolloError('Error en obtener datos de los Condominios');
  //   }
  // },
};

module.exports = querys;
