const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  "Datos para usuario nuevo"
  input UserInput {
    displayName: String!
    email: String!
    password: String!
    phone: String
    roll: EnumUserRoll!
  }

  input UserEditInput {
    displayName: String!
    email: String!
    phone: String
    roll: EnumUserRoll!
    active: Boolean
  }

  "Datos para Autenticacion de usuario"
  input AuthenticateInput {
    email: String!
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
    displayName: String!
    email: String!
    phone: String
    active: Boolean
    roll: String
    created_at: Date!
    updated_at: Date!
  }

  type Query {
    "Obtener solo un usuario"
    getUser(id: String): User
    "Muestra todos los usuarios de la App"
    getUsers: [User]
    "Muestra todos los usuarios activos"
    getUsersActive: [User]
  }

  type Mutation {
    "Creacion de nuevo usuario"
    newUser(input: UserInput!): User
    "Autenticacion del usuario, retornando el token"
    authenticateToken(input: AuthenticateInput!): Token
    "Revalidar o regeneral un nuevo token para el usuario"
    revalidateToken: Token

    # "Autenticacion de usuario, retornado el usuario"
    # authenticateRetUser(input: AuthenticateInput!): User
    "Actualizacion de datos del usuario"
    updUser(id: String!, input: UserEditInput!): User
    "Dar de baja al usuario"
    delUser(id: String): ReturnMessage
    "Cambio de password o contraseña"
    UserPassword(input: UserPasswordInput!): ReturnMessage
  }
`;

module.exports = typeDefs;
