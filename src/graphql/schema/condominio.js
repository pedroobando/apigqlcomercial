const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  "Datos para ingreso de condominio"
  input CondominioInput {
    name: String!
    address: String
    dni: String
    email: String!
    phone: String
    contactName: String
    active: Boolean
    coinTypeId: ID
    coinTypeName: String
    coinTypeSymbol: String
  }

  "Informacion datos del condominio"
  type Condominio {
    id: ID!
    name: String!
    address: String
    dni: String
    email: String!
    phone: String
    contactName: String
    active: Boolean!
    isblock: Boolean!
    coinTypeId: ID
    propertys: [Property]
    propertiesCount: Int
    coinType: CoinType
    owners: [Owner]
    ownersCount: Int
    users: [String]
    user_at: ID!
    created_at: Date!
    updated_at: Date!
  }

  type Query {
    "Obtiene el condonminio por el ID"
    getCondominio(id: ID!): Condominio
    "Obtiene todos los condominios asociados al usuario actual"
    getCondominios: [Condominio]!
    getCondominiosActive: [Condominio]!
  }

  type Mutation {
    "Creacion de nuevo condominio"
    newCondominio(input: CondominioInput!): Condominio
    "Actualizacion de datos del condominio"
    updateCondominio(id: ID!, input: CondominioInput!): Condominio
    "Actualizacion status actives del condominio"
    updateCondominioActive(id: ID!, active: Boolean): Condominio
    "Eliminacion de registo del condominio"
    removeCondominio(id: ID!): Condominio
  }
`;

module.exports = typeDefs;
