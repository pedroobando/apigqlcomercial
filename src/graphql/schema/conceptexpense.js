const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  "Datos para ingreso conceptos de gastos del condominio"
  input ConceptExpenseInput {
    condominioId: ID!
    conceptName: String!
    permanent: Boolean!
    conceptGroupId: ID
    forecastExpense: Boolean
    calculateType: String
  }

  "Datos del concepto de gasto"
  type ConceptExpense {
    id: ID!
    condominioId: ID!
    conceptName: String!
    forecastExpense: Boolean
    calculateType: CalculateExpenseType
    permanent: Boolean
    conceptGroupId: ID
    conceptGroup: ConceptExpenseGrp
    user_at: ID!
    updated_at: Date!
  }

  "Datos para ingreso conceptos de gastos del condominio"
  input ConceptExpenseGrpInput {
    condominioId: ID!
    conceptNameGrp: String!
    active: Boolean
  }

  "Datos del concepto de gasto"
  type ConceptExpenseGrp {
    id: ID!
    condominioId: ID!
    conceptNameGrp: String!
    active: Boolean
    conceptExpenses: [ConceptExpense]
    user_at: ID!
    updated_at: Date!
  }

  "Paginacion de Conceptos de Gastos"
  type ConceptExpensePaginate {
    docs: [ConceptExpense]
    paginate: Paginate
  }

  type Query {
    "Obtiene un concepto de gasto"
    getConceptExpense(id: ID!): ConceptExpense
    "Obtiene todos los conceptos de gastos registrados"
    getConceptExpenses(condid: ID!): [ConceptExpense]!
    "Obtiene todos los conceptos de gastos registrados y paginados"
    getConceptExpensesPaginate(condid: ID!, page: Int, limit: Int): ConceptExpensePaginate

    "Obtiene un grupo de concepto de gasto"
    getConceptExpenseGrp(id: ID!): ConceptExpenseGrp
    "Obtiene todos los grupos de conceptos de gastos registrados"
    getConceptExpenseGrps(condid: ID!, active: Boolean): [ConceptExpenseGrp]!
  }

  type Mutation {
    "Creacion de un nuevo concepto de gasto"
    newConceptExpense(input: ConceptExpenseInput!): ConceptExpense
    "Actualizacion de un concepto de gastos del condominio"
    updateConceptExpense(id: ID!, input: ConceptExpenseInput!): ConceptExpense
    "Eliminacion del concepto de gasto del condominio"
    removeConceptExpense(id: ID!): ConceptExpense

    "Creacion de un nuevo grupo concepto de gasto"
    newConceptExpenseGrp(input: ConceptExpenseGrpInput!): ConceptExpenseGrp
    "Actualizacion de un grupo de concepto de gastos del condominio"
    updateConceptExpenseGrp(id: ID!, input: ConceptExpenseGrpInput!): ConceptExpenseGrp
    "Eliminacion del un grupo concepto de gasto del condominio"
    removeConceptExpenseGrp(id: ID!): ConceptExpenseGrp
  }
`;

module.exports = typeDefs;
