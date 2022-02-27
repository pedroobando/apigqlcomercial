const { ApolloError } = require('apollo-server-express');
const Owner = require('../../../mongodb/models/owner');
const { isExistsCondominio, isUserAuthenticate } = require('../middleware');

const idempty = '0'.repeat(24);

const mutation = {
  newOwner: async (_, { input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const { condominioId } = input;
    await isExistsCondominio(condominioId);

    try {
      input.user_at = uid;
      input.created_at = Date.now();
      input.updated_at = Date.now();
      const createOwner = new Owner(input);
      await createOwner.validate();
      await createOwner.save();

      return createOwner;
    } catch (error) {
      if (error.code == 11000)
        throw new Error(`Duplicidad en datos, DNI:${input.dni}, registrado con anterioridad.`);
      throw new Error(`Problema ingresando datos del propietario!`);
    }
  },

  updateOwner: async (_, { id, input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    try {
      input.user_at = uid;
      input.updated_at = Date.now();
      const updateOwner = await Owner.findByIdAndUpdate(id, input, { new: true });
      await updateOwner.validate();

      return updateOwner;
    } catch (error) {
      if (error.code == 11000)
        throw new Error(`Duplicidad en datos, DNI:${input.dni}, registrado con anterioridad.`);
      throw new Error(`Problema al actualizar los datos del propietario!`);
    }
  },

  removeOwner: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const findOwner = await Owner.findById(id);
    if (!findOwner) throw new ApolloError('Propietario no fue encontrado!');

    try {
      await Owner.findByIdAndDelete(id);
      return findOwner;
    } catch (error) {
      throw new Error(`Problema al eliminar el propietario!`);
    }
  },
};

module.exports = mutation;
