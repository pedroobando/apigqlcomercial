const { ApolloError } = require('apollo-server-express');
const { Product } = require('../../../mongodb/models/product');
const { isUserAuthenticate } = require('../middleware');

const idempty = '0'.repeat(24);

const mutation = {
  newProduct: async (_, { input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    try {
      input.created_at = Date.now();
      input.updated_at = Date.now();
      const createProduct = new Product(input);
      await createProduct.validate();
      await createProduct.save();

      return createProduct;
    } catch (error) {
      if (error.code == 11000) throw new Error(`Duplicidad en datos, registrado con anterioridad.`);
      throw new Error(`Problema ingresando datos del producto!`);
    }
  },

  updProduct: async (_, { productId, input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    try {
      input.updated_at = Date.now();
      const updateProduct = await Product.findByIdAndUpdate(productId, input, { new: true });
      await updateProduct.validate();

      return updateProduct;
    } catch (error) {
      if (error.code == 11000) throw new Error(`Duplicidad en datos, registrado con anterioridad.`);
      throw new Error(`Problema ingresando datos del producto!`);
    }
  },

  delProduct: async (_, { productId }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const findProduct = await Product.findById(productId);
    if (!findProduct) throw new ApolloError('Producto no encontrado!');

    try {
      await Product.findByIdAndDelete(productId);
      return true;
    } catch (error) {
      throw new Error(`Problema al eliminar el producto!`);
    }
  },
};

module.exports = mutation;
