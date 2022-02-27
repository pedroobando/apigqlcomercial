const { gql } = require('apollo-server-express');
// const ownerSchema = require('./owner');
const userSchema = require('./user');
const productSchema = require('./product');
// const propertySchema = require('./property');
// const propertyTypeSchema = require('./properttype');
// const coinTypeSchema = require('./cointype');
// const conceptExpenseSchema = require('./conceptexpense');
// const expenseSchema = require('./expense');
// const supplierSchema = require('./supplier');

// Schema
const typeDefs = gql`
  scalar Date

  enum EnumUserRoll {
    ADMIN
    CAJERO
  }

  "Calculo para el tipo de Gasto"
  enum CalculateExpenseType {
    BYALICUOT
    BYEQUALPARTS
    BYONEAMOUNTFORALL
  }

  "Estatus del Gasto"
  enum ExpenseStatus {
    DRAFT
    FINISHED
    SHIPPEDANDLOADED
  }

  "Datos para la paginacion"
  type Paginate {
    totalDocs: Int
    limit: Int
    totalPages: Int
    page: Int
    pagingCounter: Int
    hasPrevPage: Boolean
    hasNextPage: Boolean
    prevPage: Boolean
    nextPage: Boolean
  }

  "Mensaje de retorno usado en action delete"
  type ReturnMessage {
    id: ID!
    message: String
    success: Boolean
  }

  ${userSchema}
  ${productSchema}
`;

// ${condominioSchema}
// ${propertySchema}
// ${propertyTypeSchema}
// ${coinTypeSchema}
// ${conceptExpenseSchema}
// ${expenseSchema}
// ${supplierSchema}

module.exports = typeDefs;
