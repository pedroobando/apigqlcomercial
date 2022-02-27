const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  "Datos para ingreso de los gastos"
  input ExpenseInput {
    condominioId: ID!
    expenseName: String!
    expenseDate: Date!
    expenseStatus: ExpenseStatus!
  }

  "Datos del gasto"
  type Expense {
    id: ID!
    condominioId: ID!
    expenseName: String!
    expenseDate: Date!
    expenseStatus: ExpenseStatus
    expenseAmount: Float
    details: [ExpenseDetail]
    user_at: ID!
    created_at: Date!
    updated_at: Date!
  }

  "Datos para ingreso del detalle de los gastos"
  input ExpenseDetailInput {
    expenseId: ID!
    isForecast: Boolean!
    amount: Float
    supplierId: ID
    conceptExpenseId: ID!
    description: String!
    calculateType: CalculateExpenseType!
    propertiesId: [ID!]
    transactionDate: Date!
    transactionDoc: String
  }

  "Datos detalle del gasto"
  type ExpenseDetail {
    id: ID!
    expenseId: ID!
    isForecast: Boolean!
    amount: Float
    supplierId: ID
    conceptExpenseId: ID!
    conceptExpense: ConceptExpense
    description: String!
    calculateType: CalculateExpenseType!
    propertiesId: [ID!]
    transactionDate: Date!
    transactionDoc: String
    user_at: ID
    updated_at: Date
  }

  "Paginacion de Gastos"
  type ExpensePaginate {
    docs: [Expense]
    paginate: Paginate
  }

  type Query {
    "Obtiene un gasto"
    getExpense(id: ID!): Expense
    "Obtiene los gastos registrados"
    getExpenses(condid: ID!): [Expense]!
    "Obtiene los gastos registrados y paginados"
    getExpensesPaginate(condid: ID!, page: Int, limit: Int): ExpensePaginate

    "Obtiene un detalle de gasto"
    getExpenseDetail(id: ID!): ExpenseDetail
  }

  type Mutation {
    "Creacion de un nuevo to de gasto"
    newExpense(input: ExpenseInput!): Expense
    "Actualizacion de gastos del condominio"
    updateExpense(id: ID!, input: ExpenseInput!): Expense
    "Eliminacion de gasto del condominio"
    removeExpense(id: ID!): Expense

    "Creacion de un nuevo detalle de gasto"
    newExpenseDetail(input: ExpenseDetailInput!): ExpenseDetail
    "Actualizacion de un detalle de gastos del condominio"
    updateExpenseDetail(id: ID!, input: ExpenseDetailInput!): ExpenseDetail
    "Eliminacion de detalle de gasto del condominio"
    removeExpenseDetail(id: ID!): ExpenseDetail
  }
`;

module.exports = typeDefs;
