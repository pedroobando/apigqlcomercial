const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { dataTypeStringDefault, dataTypeUser, dataTypeCondominio } = require('./xdataTypeModel');

const OwnerSchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  ownerName: {
    ...dataTypeStringDefault,
  },
  dni: {
    ...dataTypeStringDefault,
    required: false,
  },
  email: {
    ...dataTypeStringDefault,
    required: false,
  },
  phone: {
    ...dataTypeStringDefault,
    required: false,
  },
  comment: {
    ...dataTypeStringDefault,
    required: false,
  },
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
OwnerSchema.plugin(mongoosePaginate);
// Creacion de indices por condominioId = mayor rapides
OwnerSchema.index({ condominioId: 1 }, { unique: false });
// Verificacion de duplicidad en DNI
OwnerSchema.index({ dni: 1, condominioId: 1 }, { unique: true });

module.exports = model('Owner', OwnerSchema);
