const CoinType = require('../../../mongodb/models/cointype');
const { ApolloError } = require('apollo-server-express');
const { isUserAuthenticate } = require('../middleware');

const querys = {
  getCoinType: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const coinType = await CoinType.findById(id);
    if (!coinType) throw new ApolloError('Moneda no existente', '404');
    return coinType;
  },

  getCoinTypes: async (_, { condid, active = true }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    try {
      const listCoinType = active
        ? await CoinType.find({ condominioId: condid, active })
        : await CoinType.find({ condominioId: condid });
      return listCoinType;
    } catch (error) {
      throw new ApolloError('Error en obtener datos de las monedas');
    }
  },
};

module.exports = querys;
