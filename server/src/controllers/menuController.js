const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');

const createMenuItem = async (req, res) => {
  try {
    const { name, price, category, location } = req.body;
    
    const menuItem = new MenuItem({
      name,
      price,
      category,
      location
    });

    await menuItem.save();
    res.status(201).json({ message: 'Menu item created', menuItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create menu item', error: error.message });
  }
};

const getMenuByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    
    const categories = await Category.find({ location: locationId });
    const menuItems = await MenuItem.find({ location: locationId })
      .populate('category')
      .populate('modifiers');

    res.json({ categories, menuItems });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu', error: error.message });
  }
};

module.exports = { createMenuItem, getMenuByLocation };
