const Reservation = require('../models/Reservation');
const Table = require('../models/Table');

const createReservation = async (req, res) => {
  try {
    const { customerName, customerPhone, table, guestCount, reservationDate, location } = req.body;
    
    const tableObj = await Table.findById(table);
    if (!tableObj) return res.status(404).json({ message: 'Table not found' });

    const reservation = new Reservation({
      customer: req.user?.id,
      customerName,
      customerPhone,
      table,
      guestCount,
      reservationDate,
      location,
      status: 'pending'
    });

    await reservation.save();
    res.status(201).json({ message: 'Reservation created', reservation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create reservation', error: error.message });
  }
};

const getReservations = async (req, res) => {
  try {
    const { locationId } = req.params;
    
    const reservations = await Reservation.find({ location: locationId })
      .populate('table')
      .populate('customer');
    
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reservations', error: error.message });
  }
};

module.exports = { createReservation, getReservations };
