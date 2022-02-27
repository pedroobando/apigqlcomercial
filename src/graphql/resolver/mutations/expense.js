const { Expense } = require('../../../mongodb/models/expense');
const { ApolloError } = require('apollo-server-express');
const { validEmail } = require('../../../utils');
const { EnumExpenseStatus } = require('../../enumTypes');
const { isExistsCondominio, isUserAdministrator, isUserAuthenticate } = require('../middleware');

const mutation = {
  newExpense: async (_, { input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const { condominioId } = input;
    const existsCondominio = await isExistsCondominio(condominioId);
    // isUserAdministrator(activeUser, existsCondominio.id);

    try {
      const newExpense = {
        ...input,
        expenseStatus: EnumExpenseStatus.DRAFT,
        user_at: uid,
        created_at: Date.now(),
        updated_at: Date.now(),
      };
      const createExpense = new Expense(newExpense);
      await createExpense.validate();
      await createExpense.save();

      return createExpense;
    } catch (error) {
      throw new ApolloError(`Problema al ingresar los datos de los gastos..!`);
    }
  },

  updateExpense: async (_, { id, input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const { condominioId } = input;
    const existsCondominio = await isExistsCondominio(condominioId);
    // isUserAdministrator(activeUser, existsCondominio.id);

    const findExpense = await Expense.findById(id);
    if (!findExpense) throw new ApolloError('Registro de los gastos no fue encontrado');
    if (findExpense.statusExpense === EnumExpenseStatus.SHIPPEDANDLOADED)
      throw new ApolloError('Los gastos no pueden ser cambiados, ya fueron enviados y cargados.');

    try {
      input.user_at = uid;
      input.updated_at = Date.now();

      const updExpense = await Expense.findByIdAndUpdate(id, input, {
        new: true,
      });
      await updExpense.validate();
      return updExpense;
    } catch (error) {
      throw new Error(`Problema al actualizar los datos de los gastos..!`);
    }
  },

  removeExpense: async (_, { condid, id }, ctx) => {
    const { activeUser } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    const findExpense = await Expense.findById(id);
    if (!findExpense) throw new ApolloError('Registro de los gastos no fue encontrado');
    if (findExpense.statusExpense !== EnumStatusExpense.DRAFT)
      throw new ApolloError('Los gastos deben tener status BORRADOR, para ser eliminados.');

    try {
      const { nameExpense } = findExpense;
      await Expense.findByIdAndDelete(id);
      return `Los gastos correspondiente a  ${nameExpense} fueron eliminados.`;
    } catch (error) {
      throw new Error(`Problema al eliminar los datos..!`);
    }
  },
};

module.exports = mutation;
