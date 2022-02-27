const { ConceptExpense, ConceptExpenseGrp } = require('../../../mongodb/models/conceptexpense');

const { ApolloError } = require('apollo-server-express');
const { isUserAuthenticate, retDataPaginate } = require('../middleware');

const querys = {
  getConceptExpense: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const conceptExpense = await ConceptExpense.findById(id);
    if (!conceptExpense) throw new ApolloError('El concepto de gasto, no fue localizado.', '404');
    return conceptExpense;
  },

  getConceptExpenses: async (_, { condid }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      const listConceptExpense = await ConceptExpense.find({ condominioId: condid });
      return listConceptExpense;
    } catch (error) {
      throw new ApolloError('Error en obtener los concepto de gasto.');
    }
  },

  getConceptExpensesPaginate: async (_, { condid, page = 1, limit = 20 }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    const options = {
      page,
      limit,
      sort: { conceptName: 1 },
      collation: {
        locale: 'en',
      },
    };

    try {
      const seekCondition = { condominioId: condid };
      const conceptExpensePages = await ConceptExpense.paginate(seekCondition, options);

      const retData = {
        docs: [...conceptExpensePages.docs],
        paginate: retDataPaginate(conceptExpensePages),
      };
      return retData;
    } catch (error) {
      throw new ApolloError('Error paginando datos del concepto de gasto.');
    }
  },

  getConceptExpenseGrp: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const conceptExpenseGrp = await ConceptExpenseGrp.findById(id);
    if (!conceptExpenseGrp)
      throw new ApolloError('El grupo de concepto de gasto, no fue localizado.', '404');
    return conceptExpenseGrp;
  },

  getConceptExpenseGrps: async (_, { condid, active = true }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      const listConceptExpenseGrp = active
        ? await ConceptExpenseGrp.find({ condominioId: condid, active }).sort({
            conceptNameGrp: 1,
          })
        : await ConceptExpenseGrp.find({ condominioId: condid }).sort({ conceptNameGrp: 1 });
      return listConceptExpenseGrp;
    } catch (error) {
      throw new ApolloError('Error en obtener grupos de concepto de gasto.');
    }
  },
};

module.exports = querys;
