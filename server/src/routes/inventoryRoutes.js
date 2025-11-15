const express = require('express');
const { 
  createInventoryItem, 
  getInventoryByLocation, 
  updateInventoryQuantity,
  getLowStockItems 
} = require('../controllers/inventoryController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticate, authorize(['admin', 'manager']), createInventoryItem);
router.get('/:locationId', authenticate, getInventoryByLocation);
router.get('/:locationId/low-stock', authenticate, getLowStockItems);
router.patch('/:itemId', authenticate, authorize(['admin', 'manager']), updateInventoryQuantity);

module.exports = router;
