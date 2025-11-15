const express = require('express');
const { createLocation, getLocations, getLocationById } = require('../controllers/locationController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticate, authorize(['admin']), createLocation);
router.get('/', getLocations);
router.get('/:locationId', getLocationById);

module.exports = router;
