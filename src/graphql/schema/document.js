const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  "Datos para ingreso del Dueño o Propietario del inmueble"
  input DocumentInput {
    docDate: Date!
    docNumber: Int
    peopleName: String!
    docType: String!
    finished: Boolean
    details: [DocumentDetailInput]
  }

  input DocumentDetailInput {
    productId: ID!
    productName: String
    amount: Float
    quantity: Float!
  }

  type Document {
    id: ID!
    docDate: Date!
    docNumber: Int
    peopleName: String!
    docType: String!
    finished: Boolean
    details: [DocumentDetail]
    created_at: Date!
    updated_at: Date!
  }

  "Datos para ingreso de la Propietario"
  type DocumentDetail {
    productId: ID!
    amount: Float
    productName: String
    quantity: Float!
    updated_at: Date!
  }

  type DocumentPaginate {
    docs: [Document]
    paginate: Paginate
  }

  type Query {
    "Obtiene un documento segun el ID"
    getDocument(documentId: ID!): Document
    "Obtener los documentos"
    getDocuments: [Document]
    "Obtener los documentos por tipo"
    getDocumentsIn(finished: Boolean): [Document]
    getDocumentsOut(finished: Boolean): [Document]
    "Obtener todo los documentos paginados"
    getProductsPaginate(page: Int, limit: Int, sortName: String): ProductPaginate
  }

  type Mutation {
    "Crear un producto"
    newDocument(input: DocumentInput!): Document
    "Actualizar un producto"
    updDocument(documentId: ID!, input: DocumentInput!): Document
    "Eliminar un Producto"
    delDocument(documentId: ID!): Boolean
  }
`;

module.exports = typeDefs;
