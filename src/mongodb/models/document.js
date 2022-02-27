const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DocDetailSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  productName: {
    type: Schema.Types.String,
    trim: true,
    required: false,
  },
  amount: {
    type: Schema.Types.Number,
    required: true,
    default: 0,
  },
  quantity: {
    type: Schema.Types.Number,
    default: 0,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

DocDetailSchema.index({ productId: 1, updated_at: 1 }, { unique: false });

const DocumentSchema = new Schema({
  docDate: {
    type: Date,
    default: Date.now(),
  },
  docNumber: {
    type: Schema.Types.Number,
    default: 0,
  },
  peopleName: {
    type: Schema.Types.String,
    trim: true,
    required: true,
  },
  // Entrada / Salida / Compra / Venta / Devolucion
  docType: {
    type: Schema.Types.String,
    trim: true,
    required: true,
  },
  // draft || finished || shipped and loaded
  finished: {
    type: Schema.Types.Boolean,
    default: false,
  },
  details: [DocDetailSchema],
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
DocumentSchema.plugin(mongoosePaginate);
DocumentSchema.index({ docType: 1, docDate: 1, finished: 1 }, { unique: false });
DocumentSchema.index({ docType: 1, docNumber: 1 }, { unique: false });
const Document = model('Document', DocumentSchema);

module.exports = { Document };
