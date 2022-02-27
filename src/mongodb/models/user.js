const { Schema, model } = require('mongoose');

const { dataTypeStringDefault } = require('./xdataTypeModel');

const UserSchema = Schema({
  email: {
    ...dataTypeStringDefault,
    unique: true,
  },
  roll: {
    ...dataTypeStringDefault,
    required: true,
  },
  password: {
    ...dataTypeStringDefault,
  },
  displayName: {
    ...dataTypeStringDefault,
  },
  phone: {
    ...dataTypeStringDefault,
    required: false,
  },
  active: {
    type: Schema.Types.Boolean,
    default: true,
    required: true,
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

UserSchema.index({ email: 1 }, { unique: true });
module.exports = model('User', UserSchema);
