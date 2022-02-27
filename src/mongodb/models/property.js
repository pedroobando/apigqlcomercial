const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { dataTypeStringDefault, dataTypeUser, dataTypeCondominio } = require('./xdataTypeModel');

const PropertySchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  propertyName: {
    ...dataTypeStringDefault,
  },
  propertyTypeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'PropertyType',
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  aliquot: {
    type: Schema.Types.Number,
    default: 0,
  },
  user_at: {
    ...dataTypeUser,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

PropertySchema.plugin(mongoosePaginate);
// Creacion de indices por condominioId = mayor rapides
PropertySchema.index({ condominioId: 1 }, { unique: false });
PropertySchema.index({ ownerId: 1 }, { unique: false });
PropertySchema.index({ propertyTypeId: 1 }, { unique: false });
// Verificacion de duplicidad en propertyName
PropertySchema.index({ propertyName: 1, propertyTypeId: 1, condominioId: 1 }, { unique: true });
const Property = model('Property', PropertySchema);

// PropertyTypeSchema (Apartamento/Muelle/Maletero/Estacionamiento)
const PropertyTypeSchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  propertyTypeName: {
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
PropertyTypeSchema.index({ condominioId: 1 }, { unique: false });
PropertyTypeSchema.index({ condominioId: 1, active: 1 }, { unique: false });

const PropertyType = model('PropertyType', PropertyTypeSchema);

module.exports = { Property, PropertyType };
