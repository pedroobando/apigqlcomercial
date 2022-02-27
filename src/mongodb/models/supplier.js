const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { dataTypeUser, dataTypeCondominio } = require('./xdataTypeModel');

const SupplierSchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  supplierName: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  supplierDni: {
    type: Schema.Types.String,
    required: false,
    trim: true,
  },
  supplierEmail: {
    type: Schema.Types.String,
    required: false,
    trim: true,
  },
  supplierPhone: { type: Schema.Types.String, required: false, trim: true },
  supplierAddress: { type: Schema.Types.String, required: false, trim: true },
  supplierComment: { type: Schema.Types.String, required: false, trim: true },
  user_at: {
    ...dataTypeUser,
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
SupplierSchema.plugin(mongoosePaginate);
// Creacion de indices por condominioId = mayor rapides
SupplierSchema.index({ condominioId: 1 }, { unique: false });
// Verificacion de duplicidad en DNI
SupplierSchema.index({ dni: 1, condominioId: 1 }, { unique: false });

module.exports = model('Supplier', SupplierSchema);
