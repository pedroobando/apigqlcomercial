const CoinType = require('../../../mongodb/models/cointype');
const { ApolloError } = require('apollo-server-express');

const { isUserAuthenticate, isExistsCondominio } = require('../middleware');

const mutation = {
  newCoinType: async (_, { input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    try {
      input.user_at = uid;
      const newCoinType = new CoinType(input);
      await newCoinType.validate();
      await newCoinType.save();

      return newCoinType;
    } catch (error) {
      throw new Error(`Problema al ingresar los datos del tipo de moneda..!`);
    }
  },

  updateCoinType: async (_, { id, input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    try {
      input.user_at = uid;
      input.updated_at = Date.now();
      const updCoinType = await CoinType.findByIdAndUpdate(id, input, { new: true });
      return updCoinType;
    } catch (error) {
      throw new Error(`Problemas al actualizar los datos de la moneda..!`);
    }
  },

  removeCoinType: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const existsCoinType = await CoinType.findById(id);
    if (!existsCoinType) throw new ApolloError('Moneda no existente', '404');

    try {
      await CoinType.findByIdAndDelete(id);
      return existsCoinType;
    } catch (error) {
      throw new Error(`Problema al eliminar el tipo de moneda..!`);
    }
  },
};

module.exports = mutation;
