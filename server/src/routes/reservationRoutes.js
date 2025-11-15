const express = require('express');
const { createReservation, getReservations } = require('../controllers/reservationController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/', createReservation);
router.get('/:locationId', authenticate, getReservations);

module.exports = router;
