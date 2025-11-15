const express = require('express');
const { createStaff, getStaffByLocation, updateStaffStatus } = require('../controllers/staffController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticate, authorize(['admin', 'manager']), createStaff);
router.get('/:locationId', authenticate, getStaffByLocation);
router.patch('/:staffId', authenticate, authorize(['admin', 'manager']), updateStaffStatus);

module.exports = router;
