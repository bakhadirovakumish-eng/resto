const express = require('express');
const { createLoyaltyAccount, addPoints, getLoyaltyAccount } = require('../controllers/loyaltyController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticate, createLoyaltyAccount);
router.get('/:customerId', authenticate, getLoyaltyAccount);
router.patch('/:customerId/points', authenticate, addPoints);

module.exports = router;
