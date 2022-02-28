const { AuthenticationError } = require('apollo-server-express');
const User = require('../../../mongodb/models/user');
const { createToken, cifrate, cifrateVerify } = require('../../../utils');
const { isUserAuthenticate, isUserAdministrator } = require('../middleware');

const mutationUser = {
  newUser: async (_, { input }) => {
    const { nickName, password } = input;

    const elnickname = nickName.toString().toLowerCase();
    const usuarioExiste = await User.findOne({ nickName: elnickname });
    if (usuarioExiste) {
      throw new Error(`El apodo ${elnickname} ya esta registrado.`);
    }

    try {
      input.nickName = nickName.toString().toLowerCase();
      input.password = await cifrate(password);
      const newUser = new User(input);
      await newUser.validate();
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(`${error.message} Problema al registrar el usuario..!`);
    }
  },

  updUser: async (_, { id, input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    await isUserAdministrator(uid);

    let user = await User.findById(id);
    if (!user) throw new Error('Usuario no encontrado');

    try {
      input.updated_at = Date.now();
      const updateUser = await User.findByIdAndUpdate(id, input, { new: true });
      await updateUser.validate();
      return updateUser;
    } catch (error) {
      throw new Error(`Problemas actualizando los datos del usuario.`);
    }
  },

  updActive: async (_, { id, active }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    await isUserAdministrator(uid);

    let user = await User.findById(id);
    if (!user) throw new Error('Usuario no encontrado');

    try {
      // input.active = active;
      // input.updated_at = Date.now();
      const updateUser = await User.findByIdAndUpdate(
        id,
        { active, updated_at: Date.now() },
        { new: true }
      );
      await updateUser.validate();
      return updateUser;
    } catch (error) {
      throw new Error(`${error} Problemas actualizando estatus del usuario.`);
    }
  },

  delUser: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    await isUserAdministrator(uid);

    const user = await User.findById(id);
    if (!user)
      return {
        id: id,
        message: `El usuario no existente.`,
        success: false,
      };

    const { displayName } = user;
    await User.findByIdAndDelete(id);

    return { id: id, message: `Usuario ${displayName} eliminado.`, success: true };
  },

  passwUser: async (_, { input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const { oldpassword, newpassword } = input;

    let existsUser = await User.findById(uid);
    if (!existsUser) throw new Error('Usuario no encontrado');
    // Revisar si el password es correcto
    const passwordCorrecto = await cifrateVerify(oldpassword, existsUser.password);
    if (!passwordCorrecto) throw new Error('Password incorrecto');
    try {
      input.password = await cifrate(newpassword);
      input.updated_at = Date.now();

      existsUser = await User.findOneAndUpdate(id, input, { new: true });
    } catch (error) {
      throw new Error('Error cambiando password del usuario.');
    }
    return 'El cambio de contraseña ha sido exitoso.!';
  },

  authenticateToken: async (_, { input }) => {
    const { nickName, password } = input;
    // Si el usuario existe
    const existsUser = await User.findOne({ nickName });
    if (!existsUser) throw new Error(`Problema en usuario y password!`);
    if (!existsUser.active) throw new Error(`Usuario bloqueado`);
    // Revisar si el password es correcto
    const passwordCorrecto = await cifrateVerify(password, existsUser.password);
    if (!passwordCorrecto) {
      addNewFailedTry(existsUser, existsUser.failed + 1);
      throw new Error('Problema en usuario y password.');
    } else {
      addNewFailedTry(existsUser, 0);
    }
    // Crear el token
    return {
      token: createToken(existsUser.id, existsUser.displayName),
    };
  },

  revalidateToken: (_, {}, ctx) => {
    const { auth } = ctx;
    let token = undefined;
    if (auth.isAuthenticated) {
      token = createToken(auth.uid, auth.displayName);
    }
    return { token };
  },
};

const addNewFailedTry = async (tuser, nofailed) => {
  try {
    const keyId = tuser.id;
    userEntity = {
      updated_at: Date.now(),
      failed: nofailed,
      active: nofailed >= 5 ? false : true,
    };

    const updateUser = await User.findByIdAndUpdate(keyId, { ...userEntity }, { new: true });
    await updateUser.validate();
  } catch (error) {}
};

module.exports = mutationUser;
