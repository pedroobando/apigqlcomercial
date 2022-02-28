const { ApolloError } = require('apollo-server-express');
const User = require('../../../mongodb/models/user');
const { isUserAuthenticate } = require('../middleware');

const querys = {
  getUser: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    const existsUser = await User.findById(id);
    if (!existsUser) throw new ApolloError(`Usuario no localizado..!`);
    return existsUser;
  },

  getUsers: async (_, {}, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const listUsers = await User.find({}).sort('displayName');
    return [...listUsers];
  },

  getUsersActive: async (_, {}, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const listUsers = await User.find({ active: true }).sort('displayName');
    return [...listUsers];
  },
};

module.exports = querys;
