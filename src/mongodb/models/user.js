const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  nickName: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    trim: true,
  },
  roll: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    default: 'CASHIER',
  },
  password: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  displayName: {
    type: Schema.Types.String,
    required: false,
    trim: true,
  },
  phone: {
    type: Schema.Types.String,
    required: false,
    trim: true,
  },
  active: {
    type: Schema.Types.Boolean,
    required: true,
    default: true,
  },
  failed: {
    type: Schema.Types.Number,
    default: 0,
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

UserSchema.index({ nickName: 1 }, { unique: true });
module.exports = model('User', UserSchema);
