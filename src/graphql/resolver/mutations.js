const mutationUser = require('./mutations/user');
const mutationProduct = require('./mutations/product');
// const mutationCoinType = require('./mutations/cointype');
// const mutationProperty = require('./mutations/property');
// const mutationOwner = require('./mutations/owner');
// const mutationConcept = require('./mutations/conceptexpense');
// const mutationExpense = require('./mutations/expense');
// const mutationSupplier = require('./mutations/supplier');

const mutations = {
  Mutation: {
    ...mutationUser,
    ...mutationProduct,
    // ...mutationCoinType,
    // ...mutationProperty,
    // ...mutationOwner,
    // ...mutationConcept,
    // ...mutationExpense,
    // ...mutationSupplier,
  },
};

module.exports = mutations;
