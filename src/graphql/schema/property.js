const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  "Datos para ingreso de la Propiedad o inmueble"
  input PropertyInput {
    condominioId: ID!
    propertyName: String!
    aliquot: Float
    propertyTypeId: ID
    ownerId: ID
  }

  "Datos para increso de conceptos de cobro del condominio"
  input PropertyGroupInput {
    name: String!
    properties: [ID!]
  }

  "Datos para ingreso de la Propiedad"
  type Property {
    id: ID!
    condominioId: ID!
    propertyName: String
    propertyFullName: String
    propertyTypeId: ID
    propertyType: PropertyType
    ownerId: ID
    owner: Owner
    aliquot: Float
    user_at: ID!
    updated_at: Date!
  }

  type PropertyPaginate {
    docs: [Property]
    paginate: Paginate
  }

  "Datos para Grupos de Propietarios"
  type PropertyGroup {
    id: ID!
    name: String!
    properties: [Property]
    user_at: ID!
    updated_at: Date!
  }

  type Query {
    "Obtiene todos los inmuebles del condominio"
    getProperties(condid: ID!): [Property]!
    "Obtiene un inmuble segun el ID"
    getProperty(id: ID!): Property

    getPropertiesPaginate(condid: ID!, page: Int, limit: Int): PropertyPaginate
  }

  type Mutation {
    "Creacion de un nuevo inmueble"
    newProperty(input: PropertyInput!): Property
    "Actualizacion de un inmuble o propiedad del condominio"
    updateProperty(id: ID!, input: PropertyInput!): Property
    "Eliminacion de la propiedad del condominio"
    removeProperty(id: ID!): Property

    "Creacion de Grupos de propietarios"
    newPropertyGroup(condid: ID!, input: PropertyGroupInput!): PropertyGroup
    "Actualizacion de Grupos de Propietarios"
    updatePropertyGroup(condid: ID!, id: ID!, input: PropertyGroupInput!): PropertyGroup
    "Eliminacion del Grupo de Propietarios"
    removePropertyGroup(condid: ID!, id: ID!): String
  }
`;

module.exports = typeDefs;
