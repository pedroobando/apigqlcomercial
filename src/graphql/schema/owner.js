const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  "Datos para ingreso del Dueño o Propietario del inmueble"
  input OwnerInput {
    condominioId: ID!
    ownerName: String!
    dni: String!
    email: String
    phone: String
    comment: String
  }

  "Datos para ingreso de la Propietario"
  type Owner {
    id: ID!
    condominioId: ID!
    ownerName: String
    dni: String
    email: String
    phone: String
    comment: String
    properties: [Property]
    propertiesCount: Int
    user_at: ID!
    updated_at: Date!
  }

  type OwnerPaginate {
    docs: [Owner]
    paginate: Paginate
  }

  type Query {
    "Obtiene un inmuble segun el ID"
    getOwner(id: ID!): Owner
    "Obtiene el propietario solo por el dni"
    getOwnerDni(dni: String): [User]
    "Obtiene todos los propietarioss del condominio"
    getOwners(condid: ID!, sortName: String): [Owner]
    "Obtiene todos los propietarioss del condominio, paginados"
    getOwnersPaginate(
      condid: ID!
      page: Int
      limit: Int
      sortName: String
      sortASC: Int
    ): OwnerPaginate
  }

  type Mutation {
    "Creacion de un nuevo propietario o dueno"
    newOwner(input: OwnerInput!): Owner
    "Actualizacion de un propietario o dueno del condominio"
    updateOwner(id: ID!, input: OwnerInput!): Owner
    "Eliminacion del propietario o dueno"
    removeOwner(id: ID!): Owner
  }
`;

module.exports = typeDefs;
