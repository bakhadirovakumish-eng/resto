
const mongoose = require('mongoose');
require('./Modifier');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameKk: String,
  description: String,
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
  image: String,
  modifiers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Modifier' }],
  available: { type: Boolean, default: true },
  preparationTime: Number,
  calories: Number,
  allergens: [String],
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
