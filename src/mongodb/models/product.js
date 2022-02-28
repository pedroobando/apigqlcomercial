const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new Schema({
  code: {
    type: Schema.Types.String,
    required: false,
    trim: true,
  },
  productName: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  cost: {
    type: Schema.Types.Number,
    default: 0,
  },
  price: {
    type: Schema.Types.Number,
    default: 0,
  },
  active: {
    type: Schema.Types.Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user_at: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

ProductSchema.plugin(mongoosePaginate);
// Creacion de indices por condominioId = mayor rapides
ProductSchema.index({ code: 1 }, { unique: false });
ProductSchema.index({ ProductName: 1 }, { unique: false });

const Product = model('Product', ProductSchema);

// PropertyTypeSchema (Apartamento/Muelle/Maletero/Estacionamiento)
const InventorySchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  quantityStart: {
    type: Schema.Types.Number,
    default: 0,
  },
  quantityEnd: {
    type: Schema.Types.Number,
    default: 0,
  },
  monthClose: {
    type: Schema.Types.Number,
    default: 0,
  },
  yearClose: {
    type: Schema.Types.Number,
    default: 0,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

InventorySchema.index({ productId: 1 }, { unique: false });
InventorySchema.index({ productId: 1, yearClose: 1, monthClose: 1 }, { unique: false });
const Inventory = model('Inventory', InventorySchema);

module.exports = { Product, Inventory };
