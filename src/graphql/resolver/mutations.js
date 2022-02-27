const mutationUser = require('./mutations/user');
// const mutationCondomi = require('./mutations/condominio');
// const mutationCoinType = require('./mutations/cointype');
// const mutationProperty = require('./mutations/property');
// const mutationOwner = require('./mutations/owner');
// const mutationConcept = require('./mutations/conceptexpense');
// const mutationExpense = require('./mutations/expense');
// const mutationSupplier = require('./mutations/supplier');

const mutations = {
  Mutation: {
    ...mutationUser,
    // ...mutationCondomi,
    // ...mutationCoinType,
    // ...mutationProperty,
    // ...mutationOwner,
    // ...mutationConcept,
    // ...mutationExpense,
    // ...mutationSupplier,
  },
};

module.exports = mutations;
