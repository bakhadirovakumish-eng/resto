const Location = require('../models/Location');

const createLocation = async (req, res) => {
  try {
    const { name, address, city, phone, email, openingHours } = req.body;

    const location = new Location({
      name,
      address,
      city,
      phone,
      email,
      openingHours: openingHours || {
        monday: { open: '09:00', close: '22:00' },
        tuesday: { open: '09:00', close: '22:00' },
        wednesday: { open: '09:00', close: '22:00' },
        thursday: { open: '09:00', close: '22:00' },
        friday: { open: '09:00', close: '23:00' },
        saturday: { open: '10:00', close: '23:00' },
        sunday: { open: '10:00', close: '22:00' }
      }
    });

    await location.save();
    res.status(201).json({ message: 'Location created', location });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create location', error: error.message });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate('manager');
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch locations', error: error.message });
  }
};

const getLocationById = async (req, res) => {
  try {
    const { locationId } = req.params;
    const location = await Location.findById(locationId).populate('manager');
    
    if (!location) return res.status(404).json({ message: 'Location not found' });

    res.json(location);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch location', error: error.message });
  }
};

module.exports = { createLocation, getLocations, getLocationById };
