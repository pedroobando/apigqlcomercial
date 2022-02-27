const { Expense, ExpenseDetail } = require('../../../mongodb/models/expense');

const { ApolloError } = require('apollo-server-express');
const { isUserAuthenticate, retDataPaginate } = require('../middleware');

const querys = {
  getExpense: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    const expense = await Expense.findById(id);
    if (!expense) throw new ApolloError('Los gastos, no fue localizados', '404');
    return expense;
  },

  getExpenses: async (_, { condid }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      const listExpense = await Expense.find({ condominioId: condid });
      return listExpense;
    } catch (error) {
      throw new ApolloError('Error en obtener los gastos', '404');
    }
  },

  getExpensesPaginate: async (_, { condid, page = 1, limit = 20 }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    const options = {
      page,
      limit,
      sort: { expenseDate: -1 },
      collation: {
        locale: 'en',
      },
    };

    try {
      const seekCondition = { condominioId: condid };
      const expensePages = await Expense.paginate(seekCondition, options);

      const retData = {
        docs: [...expensePages.docs],
        paginate: retDataPaginate(expensePages),
      };
      return retData;
    } catch (error) {
      throw new ApolloError('Error paginando datos de gastos');
    }
  },

  getExpenseDetail: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const expenseDetail = await ExpenseDetail.findById(id);
    if (!expenseDetail) throw new ApolloError('El detalle del gasto, no fue localizado.', '404');
    return expenseDetail;
  },

  // getConceptExpenseGrps: async (_, { condid, active = true }, ctx) => {
  //   const { uid } = await isUserAuthenticate(ctx);
  //   try {
  //     const listConceptExpenseGrp = active
  //       ? await ConceptExpenseGrp.find({ condominioId: condid, active }).sort({
  //           conceptNameGrp: 1,
  //         })
  //       : await ConceptExpenseGrp.find({ condominioId: condid }).sort({ conceptNameGrp: 1 });
  //     return listConceptExpenseGrp;
  //   } catch (error) {
  //     throw new ApolloError('Error en obtener grupos de concepto de gasto.');
  //   }
  // },
};

module.exports = querys;
