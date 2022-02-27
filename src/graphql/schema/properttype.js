const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  "Datos de las tipos de propiedades de la aplicacion"
  input PropertyTypeInput {
    propertyTypeName: String!
    active: Boolean
    condominioId: ID
  }

  "Datos de las monedas que maneja la aplicacion"
  type PropertyType {
    id: ID!
    condominioId: ID!
    propertyTypeName: String!
    active: Boolean!
    user_at: ID!
    updated_at: Date!
  }

  type Query {
    "Tipos de Propiedades en el condominio"
    getPropertyType(id: ID!): PropertyType
    "Muestras los tipos de propiedades en el condominio"
    getPropertyTypes(condid: ID!, active: Boolean): [PropertyType]
  }

  type Mutation {
    "Creacion un Tipo de Propiedad"
    newPropertyType(input: PropertyTypeInput!): PropertyType
    "Actualizacion Tipo de Propiedad"
    updatePropertyType(id: ID!, input: PropertyTypeInput!): PropertyType
    "Eliminacion de una moneda"
    removePropertyType(id: ID!): PropertyType
  }
`;

module.exports = typeDefs;
