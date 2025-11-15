const express = require('express');
const { createMenuItem, getMenuByLocation } = require('../controllers/menuController');
const { authenticate, authorize } = require('../middleware/auth');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// Get all menu items (simple endpoint without location filter)
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find().populate('category').populate('modifiers');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu', error: error.message });
  }
});

// Get menu by location ID
router.get('/:locationId', getMenuByLocation);

// Create new menu item
router.post('/', authenticate, authorize(['admin', 'manager']), createMenuItem);

module.exports = router;
