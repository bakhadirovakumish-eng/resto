const LoyaltyProgram = require('../models/LoyaltyProgram');

const createLoyaltyAccount = async (req, res) => {
  try {
    const { customerId, location } = req.body;

    const loyalty = new LoyaltyProgram({
      customer: customerId,
      points: 0,
      tier: 'bronze',
      location
    });

    await loyalty.save();
    res.status(201).json({ message: 'Loyalty account created', loyalty });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create loyalty account', error: error.message });
  }
};

const addPoints = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { points } = req.body;

    const loyalty = await LoyaltyProgram.findOne({ customer: customerId });
    if (!loyalty) return res.status(404).json({ message: 'Loyalty account not found' });

    loyalty.points += points;
    loyalty.totalSpent += points * 10; // Assuming points are based on spending

    // Update tier based on total spent
    if (loyalty.totalSpent >= 500000) loyalty.tier = 'platinum';
    else if (loyalty.totalSpent >= 250000) loyalty.tier = 'gold';
    else if (loyalty.totalSpent >= 100000) loyalty.tier = 'silver';

    await loyalty.save();
    res.json({ message: 'Points added', loyalty });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add points', error: error.message });
  }
};

const getLoyaltyAccount = async (req, res) => {
  try {
    const { customerId } = req.params;

    const loyalty = await LoyaltyProgram.findOne({ customer: customerId })
      .populate('customer');
    
    if (!loyalty) return res.status(404).json({ message: 'Loyalty account not found' });

    res.json(loyalty);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch loyalty account', error: error.message });
  }
};

module.exports = { createLoyaltyAccount, addPoints, getLoyaltyAccount };
