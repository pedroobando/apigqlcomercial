const { Schema, model } = require('mongoose');

const { dataTypeStringDefault, dataTypeUser, dataTypeProperty } = require('./xdataTypeModel');

const CondominioSchema = new Schema({
  name: {
    ...dataTypeStringDefault,
  },
  dni: {
    ...dataTypeStringDefault,
    required: false,
  },
  email: {
    ...dataTypeStringDefault,
  },
  address: {
    ...dataTypeStringDefault,
    required: false,
  },
  phone: {
    ...dataTypeStringDefault,
    required: false,
  },
  contactName: {
    ...dataTypeStringDefault,
    required: false,
  },
  coinTypeId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  active: {
    type: Schema.Types.Boolean,
    default: true,
  },
  isblock: {
    type: Schema.Types.Boolean,
    default: false,
  },
  users: {
    type: [Schema.Types.String],
    default: [],
  },

  user_at: {
    ...dataTypeStringDefault,
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

module.exports = model('Condominio', CondominioSchema);
