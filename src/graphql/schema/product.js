const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  "Datos para ingreso del Dueño o Propietario del inmueble"
  input ProductInput {
    code: String
    productName: String!
    cost: Float
    price: Float
  }

  "Datos para ingreso de la Propietario"
  type Product {
    id: ID!
    code: String
    productName: String!
    cost: Float!
    price: Float!
    created_at: Date!
    updated_at: Date!
  }

  type Inventory {
    id: ID!
    productId: ID!
    quantityStart: Float
    quantityEnd: Float
    monthClose: Int
    yearClose: Int
    updated_at: Date!
  }

  type ProductPaginate {
    docs: [Product]
    paginate: Paginate
  }

  type Query {
    "Obtiene un producto segun el ID"
    getProduct(productId: ID!): Product
    "Obtiene un producto segun el ID"
    getProductCode(code: String): Product
    "Obtener los productos"
    getProducts: [Product]
    "Obtener los productos activos"
    getProductsActive: [Product]
    "Obtener el inventario de un producto"
    getInventory(productId: ID!): Float
    "Obtener todo los productos paginados"
    getProductsPaginate(page: Int, limit: Int, sortName: String): ProductPaginate
  }

  type Mutation {
    "Crear un producto"
    newProduct(input: ProductInput!): Product
    "Actualizar un producto"
    updProduct(productId: ID!, input: ProductInput!): Product
    "Eliminar un Producto"
    delProduct(productId: ID!): Boolean
  }
`;

module.exports = typeDefs;
