const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ExpenseDetailSchema = new Schema({
  expenseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Expense',
  },
  conceptExpenseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ConceptExpense',
  },
  description: {
    type: Schema.Types.String,
    trim: true,
    required: false,
  },
  suppierId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Supplier',
  },
  transactionDate: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
  transactionDoc: {
    type: Schema.Types.String,
    required: false,
    trim: true,
  },
  // BYALICUOT / BYEQUALPARTS / BYONEAMOUNTFORALL
  calculateType: {
    type: Schema.Types.String,
    trim: true,
    required: false,
  },
  propertiesId: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  // is Prevision
  isForecast: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Schema.Types.Number,
    required: true,
    default: 0,
  },
  user_at: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const ExpenseSchema = new Schema({
  condominioId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Condominio',
  },
  expenseName: {
    type: Schema.Types.String,
    trim: true,
    required: true,
  },
  expenseDate: {
    type: Date,
    default: Date.now(),
  },
  // draft || finished || shipped and loaded
  expenseStatus: {
    type: Schema.Types.String,
    trim: true,
    required: true,
  },
  user_at: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

// Agregando sistema de paginacion
ExpenseSchema.plugin(mongoosePaginate);
// Creacion de indices por condominioId = mayor rapides
ExpenseSchema.index({ condominioId: 1 }, { unique: false });
// Creacion de Indices por ExpenseId
ExpenseDetailSchema.index({ expenseId: 1 }, { unique: false });
// const ExpenseDetail = model('ExpenseDetail', ExpenseDetailSchema);
const Expense = model('Expense', ExpenseSchema);
const ExpenseDetail = model('ExpenseDetail', ExpenseDetailSchema);

module.exports = { Expense, ExpenseDetail };
