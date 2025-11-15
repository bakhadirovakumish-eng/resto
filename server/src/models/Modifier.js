const mongoose = require('mongoose');

const modifierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: [{
    name: String,
    price: Number
  }],
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Modifier', modifierSchema);
