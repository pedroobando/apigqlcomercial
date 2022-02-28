const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  "Datos para usuario nuevo"
  input UserInput {
    displayName: String!
    nickName: String!
    password: String!
    phone: String
    roll: EnumUserRoll
  }

  input UserEditInput {
    displayName: String!
    nickName: String!
    phone: String
    roll: EnumUserRoll
  }

  "Datos para Autenticacion de usuario"
  input AuthenticateInput {
    nickName: String!
    password: String!
  }

  "Datos para cambio de contraseña"
  input UserPasswordInput {
    oldpassword: String!
    newpassword: String!
  }

  "Token de seguridad entre cliente & servidor"
  type Token {
    token: String
  }

  "Informacion Usuario de la aplicacion"
  type User {
    id: ID!
    displayName: String
    nickName: String
    phone: String
    active: Boolean
    roll: String
    failed: Int
    created_at: Date!
    updated_at: Date!
  }

  type Query {
    "Obtener solo un usuario"
    getUser(id: ID!): User
    "Muestra todos los usuarios de la App"
    getUsers: [User]
    "Muestra todos los usuarios activos"
    getUsersActive: [User]
  }

  type Mutation {
    "Creacion de nuevo usuario"
    newUser(input: UserInput!): User
    "Actualizacion de datos del usuario"
    updUser(id: ID!, input: UserEditInput!): User
    "Actualizacion de datos del usuario"
    updActive(id: ID!, active: Boolean!): User
    "Dar de baja al usuario"
    delUser(id: ID!): ReturnMessage

    "Autenticacion del usuario, retornando el token"
    authenticateToken(input: AuthenticateInput!): Token
    "Revalidar o regeneral un nuevo token para el usuario"
    revalidateToken: Token
    "Cambio de password o contraseña"
    passwUser(input: UserPasswordInput!): ReturnMessage

    # "Autenticacion de usuario, retornado el usuario"
    # authenticateRetUser(input: AuthenticateInput!): User
  }
`;

module.exports = typeDefs;
