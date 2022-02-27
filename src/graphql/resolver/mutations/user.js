const { AuthenticationError } = require('apollo-server-express');
const User = require('../../../mongodb/models/user');
const { createToken, cifrate, cifrateVerify } = require('../../../utils');
const { isUserAuthenticate } = require('../middleware');

const mutationUser = {
  newUser: async (_, { input }) => {
    const { email, password } = input;

    const elEmail = email.toString().toLowerCase();
    const usuarioExiste = await User.findOne({ email: elEmail });
    if (usuarioExiste) {
      throw new Error(`El email ${elEmail} ya esta registrado.`);
    }

    try {
      input.email = email.toString().toLowerCase();
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

    const userAdmin = await User.findById(uid);
    if (userAdmin.roll !== 'ADMIN')
      return {
        id: id,
        message: `El usuario ${userAdmin.displayName} no tiene privilegios de administrador.`,
        success: false,
      };

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

  delUser: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    const userAdmin = await User.findById(uid);
    if (userAdmin.roll !== 'ADMIN')
      return {
        id: id,
        message: `El usuario ${userAdmin.displayName} no tiene privilegios de administrador.`,
        success: false,
      };

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

  UserPassword: async (_, { input }, ctx) => {
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
    const { email, password } = input;
    // Si el usuario existe
    const existsUser = await User.findOne({ email });
    if (!existsUser) throw new Error(`Usuario no registrado..!`);
    // Revisar si el password es correcto
    const passwordCorrecto = await cifrateVerify(password, existsUser.password);
    if (!passwordCorrecto) throw new Error('Password incorrecto');
    // Crear el token
    return {
      token: createToken(existsUser.id, existsUser.displayName, existsUser.email),
    };
  },

  revalidateToken: (_, {}, ctx) => {
    const { auth } = ctx;
    let token = undefined;
    if (auth.isAuthenticated) {
      token = createToken(auth.uid, auth.displayName, auth.email);
    }
    return { token };
  },
};

module.exports = mutationUser;
