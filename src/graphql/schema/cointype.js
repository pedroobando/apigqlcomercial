const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  "Datos de las monedas que maneja la aplicacion"
  input CoinTypeInput {
    coinTypeName: String!
    symbol: String
    active: Boolean
    condominioId: ID!
  }

  "Datos de las monedas que maneja la aplicacion"
  type CoinType {
    id: ID!
    condominioId: ID!
    coinTypeName: String!
    symbol: String
    active: Boolean!
    user_at: ID!
    updated_at: Date!
  }

  type Query {
    "Monedas que se manejan"
    getCoinType(id: ID!): CoinType
    getCoinTypes(condid: ID!, active: Boolean): [CoinType]
  }

  type Mutation {
    "Creacion de monedas"
    newCoinType(input: CoinTypeInput!): CoinType
    "Actualizacion de una moneda"
    updateCoinType(id: ID!, input: CoinTypeInput!): CoinType
    "Eliminacion de una moneda"
    removeCoinType(id: ID!): CoinType
  }
`;

module.exports = typeDefs;
