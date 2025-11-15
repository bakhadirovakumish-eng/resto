const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: String,
  customerPhone: String,
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  guestCount: { type: Number, required: true },
  reservationDate: { type: Date, required: true },
  duration: { type: Number, default: 120 },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);
