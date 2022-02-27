const { ApolloError } = require('apollo-server-express');
const Supplier = require('../../../mongodb/models/supplier');

const { isExistsCondominio, isUserAuthenticate } = require('../middleware');

const idempty = '0'.repeat(24);

const mutation = {
  newSupplier: async (_, { input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const { condominioId } = input;
    await isExistsCondominio(condominioId);
    const { supplierEmail } = input;

    try {
      input.supplierEmail = supplierEmail.toString().toLowerCase();
      input.user_at = uid;
      input.created_at = Date.now();
      input.updated_at = Date.now();
      const createSupplier = new Supplier(input);
      await createSupplier.validate();
      await createSupplier.save();

      return createSupplier;
    } catch (error) {
      // if (error.code == 11000)
      //   throw new Error(`Duplicidad en datos, DNI:${input.dni}, registrado con anterioridad.`);
      throw new Error(`Problema ingresando datos del proveedor!`);
    }
  },

  updateSupplier: async (_, { id, input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const { supplierEmail } = input;

    try {
      input.supplierEmail = supplierEmail.toString().toLowerCase();
      input.user_at = uid;
      input.updated_at = Date.now();
      const updateSupplier = await Supplier.findByIdAndUpdate(id, input, { new: true });
      await updateSupplier.validate();

      return updateSupplier;
    } catch (error) {
      // if (error.code == 11000)
      //   throw new Error(`Duplicidad en datos, DNI:${input.dni}, registrado con anterioridad.`);
      throw new Error(`Problema al actualizar los datos del proveedor!`);
    }
  },

  removeSupplier: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const findSupplier = await Supplier.findById(id);
    if (!findSupplier) throw new ApolloError('Proveedor no fue encontrado!');

    try {
      await Supplier.findByIdAndDelete(id);
      return findSupplier;
    } catch (error) {
      throw new Error(`Problema al eliminar el Proveedor!`);
    }
  },
};

module.exports = mutation;
