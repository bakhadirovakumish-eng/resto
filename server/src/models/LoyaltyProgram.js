const mongoose = require('mongoose');

const loyaltySchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  tier: { 
    type: String, 
    enum: ['bronze', 'silver', 'gold', 'platinum'],
    default: 'bronze'
  },
  rewards: [{
    name: String,
    pointsRequired: Number,
    redeemed: { type: Boolean, default: false },
    redeemedAt: Date
  }],
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoyaltyProgram', loyaltySchema);
