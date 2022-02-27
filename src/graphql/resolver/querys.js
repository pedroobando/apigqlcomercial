const queryUser = require('./querys/user');
// const queryCondomin = require('./querys/condominio');
// const queryCoinType = require('./querys/cointype');
// const queryOwner = require('./querys/owner');
// const queryProperty = require('./querys/property');
// const queryConcepts = require('./querys/conceptexpense');
// const queryExpense = require('./querys/expense');
// const querySupplier = require('./querys/supplier');

const querys = {
  Query: {
    ...queryUser,
    // ...queryCondomin,
    // ...queryProperty,
    // ...queryOwner,
    // ...queryCoinType,
    // ...queryConcepts,
    // ...queryExpense,
    // ...querySupplier,
  },
};

module.exports = querys;
