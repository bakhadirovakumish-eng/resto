const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, required: true },
  minQuantity: Number,
  maxQuantity: Number,
  cost: Number,
  supplier: String,
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  lastRestockedAt: Date,
  expiryDate: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);
