const Inventory = require('../models/Inventory');

const createInventoryItem = async (req, res) => {
  try {
    const { name, unit, quantity, minQuantity, cost, location } = req.body;

    const inventory = new Inventory({
      name,
      unit,
      quantity,
      minQuantity,
      cost,
      location,
      lastRestockedAt: new Date()
    });

    await inventory.save();
    res.status(201).json({ message: 'Inventory item created', inventory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create inventory item', error: error.message });
  }
};

const getInventoryByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const inventory = await Inventory.find({ location: locationId });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inventory', error: error.message });
  }
};

const updateInventoryQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const item = await Inventory.findByIdAndUpdate(
      itemId, 
      { quantity, lastRestockedAt: new Date() }, 
      { new: true }
    );
    
    if (!item) return res.status(404).json({ message: 'Inventory item not found' });

    res.json({ message: 'Inventory updated', item });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update inventory', error: error.message });
  }
};

const getLowStockItems = async (req, res) => {
  try {
    const { locationId } = req.params;
    const items = await Inventory.find({
      location: locationId,
      $expr: { $lt: ['$quantity', '$minQuantity'] }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch low stock items', error: error.message });
  }
};

module.exports = { 
  createInventoryItem, 
  getInventoryByLocation, 
  updateInventoryQuantity,
  getLowStockItems 
};
