const { ApolloError } = require('apollo-server-express');
const { ConceptExpenseGrp, ConceptExpense } = require('../../../mongodb/models/conceptexpense');
const { isExistsCondominio, isUserAuthenticate } = require('../middleware');

const mutation = {
  newConceptExpense: async (_, { input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const { condominioId } = input;
    await isExistsCondominio(condominioId);

    // crear la cuenta de grupo en caso que pase el nombre.
    // const conceptGroupId = await retNewConceptExpenseGroup(conceptGroupName, uid, condominioId);
    // input.conceptGroupId = conceptGroupName !== undefined ? conceptGroupId : input.conceptGroupId;

    try {
      input.user_at = uid;
      input.updated_at = Date.now();
      const createConceptExpense = new ConceptExpense(input);
      await createConceptExpense.validate();
      await createConceptExpense.save();

      return createConceptExpense;
    } catch (error) {
      if (error.code == 11000)
        throw new Error(`Duplicidad en datos ${input.conceptName}, registrado con anterioridad.`);
      throw new Error(`Problema ingresando concepto de gasto.`);
    }
  },

  updateConceptExpense: async (_, { id, input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    // const { condominioId, conceptGroupName } = input;

    // const conceptGroupId = await retNewConceptExpenseGroup(conceptGroupName, uid, condominioId);
    // input.conceptGroupId = conceptGroupName !== undefined ? conceptGroupId : input.conceptGroupId;

    try {
      input.user_at = uid;
      input.updated_at = Date.now();
      const updConceptExpense = await ConceptExpense.findByIdAndUpdate(id, input, { new: true });
      await updConceptExpense.validate();

      return updConceptExpense;
    } catch (error) {
      if (error.code == 11000)
        throw new Error(`Duplicidad en datos ${input.conceptName}, registrado con anterioridad.`);
      throw new Error(`Problema actualizando concepto de gasto.`);
    }
  },

  removeConceptExpense: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const findConceptExpense = await ConceptExpense.findById(id);
    if (!findConceptExpense) throw new ApolloError('Concepto de gasto no fue encontrado!');

    try {
      await ConceptExpense.findByIdAndDelete(id);
      return findConceptExpense;
    } catch (error) {
      throw new Error(`Problema eliminando concepto de gasto.`);
    }
  },

  newConceptExpenseGrp: async (_, { input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const { condominioId } = input;
    await isExistsCondominio(condominioId);

    try {
      input.user_at = uid;
      input.updated_at = Date.now();
      const createConceptExpenseGrp = new ConceptExpenseGrp(input);
      await createConceptExpenseGrp.validate();
      await createConceptExpenseGrp.save();

      return createConceptExpenseGrp;
    } catch (error) {
      throw new Error(`Problema ingresando grupo de concepto de gasto.`);
    }
  },

  updateConceptExpenseGrp: async (_, { id, input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      input.user_at = uid;
      input.updated_at = Date.now();
      const updConceptExpenseGrp = await ConceptExpenseGrp.findByIdAndUpdate(id, input, {
        new: true,
      });
      await updConceptExpenseGrp.validate();

      return updConceptExpenseGrp;
    } catch (error) {
      throw new Error(`Problema actualizando grupo de concepto de gasto.`);
    }
  },

  removeConceptExpenseGrp: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const findConceptExpenseGrp = await ConceptExpenseGrp.findById(id);
    if (!findConceptExpenseGrp) throw new ApolloError('Concepto de gasto no fue encontrado!');

    try {
      await ConceptExpenseGrp.findByIdAndDelete(id);
      return findConceptExpenseGrp;
    } catch (error) {
      throw new Error(`Problema eliminando grupo de concepto de gasto.`);
    }
  },
};

module.exports = mutation;
