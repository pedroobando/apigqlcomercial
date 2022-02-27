const { Schema, model } = require('mongoose');

const { dataTypeStringDefault, dataTypeUser, dataTypeCondominio } = require('./xdataTypeModel');

const CoinTypeSchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  coinTypeName: {
    ...dataTypeStringDefault,
  },
  symbol: {
    ...dataTypeStringDefault,
  },
  active: {
    type: Schema.Types.Boolean,
    default: true,
  },
  user_at: {
    ...dataTypeUser,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

// Creacion de indices por condominioId = mayor rapides
CoinTypeSchema.index({ condominioId: 1 }, { unique: false });
CoinTypeSchema.index({ condominioId: 1, active: 1 }, { unique: false });

module.exports = model('CoinType', CoinTypeSchema);
