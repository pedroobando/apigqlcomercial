const User = require('../../../mongodb/models/user');
const Condominio = require('../../../mongodb/models/condominio');

const { ApolloError } = require('apollo-server-express');
const { validEmail } = require('../../../utils');

const { newCoinType } = require('./cointype');

const { isExistsCondominio, isUserAdministrator, isUserAuthenticate } = require('../middleware');

const mutation = {
  newCondominio: async (_, { input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    const { email, coinTypeName, coinTypeSymbol, coinTypeId } = input;
    // if (!validEmail(email)) throw new Error(`Direccion email ${email} no valida.`);

    try {
      input.email = email.toString().toLowerCase();
      input.user_at = uid;
      input.users = [uid];

      const newCondominio = new Condominio(input);
      await newCondominio.validate();
      await newCondominio.save();

      let _newCoinType = undefined;
      if (coinTypeId === undefined) {
        _newCoinType = await newCoinType(
          '_',
          {
            input: {
              coinTypeName,
              symbol: coinTypeSymbol,
              condominioId: newCondominio.id,
            },
          },
          ctx
        );
        input.coinTypeId = _newCoinType;
      }

      // let updCondominio = { ...newCondominio._doc, coinTypeId: _newCoinType._id };
      const xupdCondominio = await Condominio.findByIdAndUpdate(newCondominio._id, input, {
        new: true,
      });

      return xupdCondominio;
    } catch (error) {
      throw new Error(`Problema al ingresar los datos del condominio..!`);
    }
  },

  updateCondominio: async (_, { id, input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(id);
    isUserAdministrator(uid, existsCondominio);

    const { email, coinTypeName, coinTypeSymbol, coinTypeId } = input;

    try {
      let _newCoinType = undefined;
      if (coinTypeId === undefined) {
        _newCoinType = await newCoinType(
          '_',
          {
            input: {
              coinTypeName,
              symbol: coinTypeSymbol,
              condominioId: id,
            },
          },
          ctx
        );
        input.coinTypeId = _newCoinType;
      }

      input.email = email.toString().toLowerCase();
      input.user_at = uid;
      input.updated_at = Date.now();
      const condominio = await Condominio.findByIdAndUpdate(id, input, { new: true });

      return condominio;
    } catch (error) {
      throw new Error(`Problemas al actualizar los datos..!`);
    }
  },

  updateCondominioActive: async (_, { id, active }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(id);
    isUserAdministrator(uid, existsCondominio);

    try {
      const condominio = await Condominio.findByIdAndUpdate(id, { active }, { new: true });

      return condominio;
    } catch (error) {
      throw new Error(`Problemas al guardar los datos..!`);
    }
  },

  removeCondominio: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(id);
    isUserAdministrator(uid, existsCondominio);

    try {
      await Condominio.findByIdAndDelete(id);
      return existsCondominio;
    } catch (error) {
      throw new Error(`Problema al eliminar los datos..!`);
    }
  },

  // newCondUser: async (_, { condid, input }, ctx) => {
  //   const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
  //   let existsCondominio = await isExistsCondominio(condid);
  //   isUserAdministrator(activeUser, existsCondominio.id);

  //   const { userId, roll } = input;
  //   const theUserCondominio = await User.findById(userId.toString());
  //   const existsInCondominio = theUserCondominio.condominios.id(condid.toString());
  //   if (existsInCondominio) throw new ApolloError('Usuario ya registrado en el condominio');

  //   try {
  //     theUserCondominio.condominios.push({
  //       _id: condid,
  //       roll,
  //       user_at: activeUserId,
  //       updated_at: Date.now(),
  //     });

  //     const addUserCond = await User.findByIdAndUpdate(userId, theUserCondominio, {
  //       new: true,
  //     });

  //     return { ...addUserCond._doc, roll: input.roll, id: addUserCond._doc._id };
  //   } catch (error) {
  //     throw new Error(`Problema al ingresar los datos..!`);
  //   }
  // },

  // updateCondUser: async (_, { condid, input }, ctx) => {
  //   const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
  //   let existsCondominio = await isExistsCondominio(condid);
  //   isUserAdministrator(activeUser, existsCondominio.id);

  //   const { userId, roll } = input;
  //   const theUserCondominio = await User.findById(userId);
  //   const existsInCondominio = theUserCondominio.condominios.id(condid.toString());
  //   if (!existsInCondominio) throw new ApolloError('Usuario no esta registrado en el condominio');

  //   try {
  //     theUserCondominio.condominios.id(condid).roll = roll;
  //     theUserCondominio.condominios.id(condid).user_at = activeUserId;
  //     theUserCondominio.condominios.id(condid).updated_at = Date.now();

  //     const updUserCond = await User.findByIdAndUpdate(userId, theUserCondominio, {
  //       new: true,
  //     });
  //     return { ...updUserCond._doc, roll: input.roll, id: updUserCond._doc._id };
  //   } catch (error) {
  //     throw new Error(`Problema al actualizar los datos de usuario en condominio.!`);
  //   }
  // },

  // removeCondUser: async (_, { condid, id }, ctx) => {
  //   const { activeUser } = await isUserAuthenticate(ctx);
  //   let existsCondominio = await isExistsCondominio(condid);
  //   isUserAdministrator(activeUser, existsCondominio.id);

  //   const theUserCondominio = await User.findById(id.toString());
  //   const existsInCondominio = theUserCondominio.condominios.id(condid.toString());
  //   if (!existsInCondominio) throw new ApolloError('Usuario no esta registrado en el condominio');

  //   try {
  //     theUserCondominio.condominios.id(condid).remove();
  //     const condominio = await User.findByIdAndUpdate(id, theUserCondominio, {
  //       new: true,
  //     });
  //     return `Usuario ${theUserCondominio.name} fue removido del condominio`;
  //   } catch (error) {
  //     throw new Error(`Problema al eliminar los datos..!`);
  //   }
  // },
};

module.exports = mutation;
