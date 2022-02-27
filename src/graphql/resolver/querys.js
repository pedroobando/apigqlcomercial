const queryUser = require('./querys/user');
const queryProduct = require('./querys/product');
const queryDocument = require('./querys/document');
// const queryOwner = require('./querys/owner');
// const queryProperty = require('./querys/property');
// const queryConcepts = require('./querys/conceptexpense');
// const queryExpense = require('./querys/expense');
// const querySupplier = require('./querys/supplier');

const querys = {
  Query: {
    ...queryUser,
    ...queryProduct,
    ...queryDocument,
    // ...queryOwner,
    // ...queryCoinType,
    // ...queryConcepts,
    // ...queryExpense,
    // ...querySupplier,
  },
};

module.exports = querys;
