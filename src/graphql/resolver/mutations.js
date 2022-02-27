const mutationUser = require('./mutations/user');
const mutationProduct = require('./mutations/product');
const mutationDocument = require('./mutations/document');

const mutations = {
  Mutation: {
    ...mutationUser,
    ...mutationProduct,
    ...mutationDocument,
  },
};

module.exports = mutations;
