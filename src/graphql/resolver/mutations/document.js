const { ApolloError } = require('apollo-server-express');
const { Document } = require('../../../mongodb/models/document');
const { Product } = require('../../../mongodb/models/product');

const { isUserAuthenticate } = require('../middleware');

const idempty = '0'.repeat(24);

const mutation = {
  newDocument: async (_, { input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      input.created_at = Date.now();
      input.updated_at = Date.now();

      const createDocument = new Document(input);
      await createDocument.validate();
      await createDocument.save();

      return createDocument;
    } catch (error) {
      if (error.code == 11000) throw new Error(`Duplicidad en datos, registrado con anterioridad.`);
      throw new Error(`Problema ingresando documento! - ${error}`);
    }
  },

  updDocument: async (_, { documentId, input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    try {
      input.updated_at = Date.now();
      const updateDocument = await Document.findByIdAndUpdate(documentId, input, { new: true });
      await updateDocument.validate();

      return updateDocument;
    } catch (error) {
      if (error.code == 11000) throw new Error(`Duplicidad en datos, registrado con anterioridad.`);
      throw new Error(`Problema ingresando datos del producto!`);
    }
  },

  delDocument: async (_, { documentId }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const findDocument = await Document.findById(documentId);
    if (!findDocument) throw new ApolloError('Documento no encontrado!');

    try {
      await Document.findByIdAndDelete(documentId);
      return true;
    } catch (error) {
      throw new Error(`Problema al eliminar el documento!`);
    }
  },
};

module.exports = mutation;
