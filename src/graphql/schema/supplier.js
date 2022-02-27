const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  "Datos para ingreso del Proveedor de gastos"
  input SupplierInput {
    condominioId: ID!
    supplierName: String!
    supplierDni: String
    supplierEmail: String
    supplierPhone: String
    supplierAddress: String
    supplierComment: String
  }

  "Datos del Proveedor"
  type Supplier {
    id: ID!
    condominioId: ID!
    supplierName: String
    supplierDni: String
    supplierEmail: String
    supplierPhone: String
    supplierAddress: String
    supplierComment: String
    user_at: ID!
    created_at: Date!
    updated_at: Date!
  }

  type SupplierPaginate {
    docs: [Supplier]
    paginate: Paginate
  }

  type Query {
    "Obtiene un proveedor segun el ID"
    getSupplier(id: ID!): Supplier
    "Obtiene todos los propietarios del condominio"
    getSuppliers(condid: ID!): [Supplier]
    "Obtiene todos los proveedores del condominio, paginados"
    getSuppliersPaginate(condid: ID!, page: Int, limit: Int): SupplierPaginate
  }

  type Mutation {
    "Creacion de un nuevo proveedor"
    newSupplier(input: SupplierInput!): Supplier
    "Actualizacion de un proveedor del condominio"
    updateSupplier(id: ID!, input: SupplierInput!): Supplier
    "Eliminacion de un proveedor"
    removeSupplier(id: ID!): Supplier
  }
`;

module.exports = typeDefs;
