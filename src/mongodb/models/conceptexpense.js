const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ConceptExpenseSchema = new Schema({
  condominioId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Condominio',
  },
  conceptName: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  forecastExpense: {
    type: Schema.Types.Boolean,
    default: false,
  },
  // BYALICUOT / BYEQUALPARTS / BYONEAMOUNTFORALL
  // POR ALICUOTA / POR PARTES IGUALES / MONTO UNICO PARA TODOS
  calculateType: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    default: 'BYALICUOT',
  },
  permanent: {
    type: Schema.Types.Boolean,
    default: false,
  },
  conceptGroupId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ConceptExpenseGrp',
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

const ConceptExpenseGrpSchema = new Schema({
  condominioId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Condominio',
  },
  conceptNameGrp: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  active: {
    type: Schema.Types.Boolean,
    default: true,
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

// Agregando sistema de paginacion
ConceptExpenseSchema.plugin(mongoosePaginate);
// Verificacion de duplicidad en conceptName
ConceptExpenseSchema.index({ condominioId: 1 }, { unique: false });
ConceptExpenseSchema.index({ conceptName: 1, condominioId: 1 }, { unique: true });
ConceptExpenseSchema.index({ conceptGroupId: 1 }, { unique: false });
const ConceptExpense = model('ConceptExpense', ConceptExpenseSchema);
const ConceptExpenseGrp = model('ConceptExpenseGrp', ConceptExpenseGrpSchema);

module.exports = { ConceptExpense, ConceptExpenseGrp };
