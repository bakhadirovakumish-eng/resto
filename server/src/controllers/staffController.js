const User = require('../models/User');

const createStaff = async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const staff = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'staff',
      location,
      status: 'active'
    });

    await staff.save();
    res.status(201).json({ message: 'Staff member created', staff });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create staff', error: error.message });
  }
};

const getStaffByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const staff = await User.find({ 
      location: locationId,
      role: { $in: ['staff', 'manager'] }
    });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch staff', error: error.message });
  }
};

const updateStaffStatus = async (req, res) => {
  try {
    const { staffId } = req.params;
    const { status } = req.body;

    const staff = await User.findByIdAndUpdate(staffId, { status }, { new: true });
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    res.json({ message: 'Staff updated', staff });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update staff', error: error.message });
  }
};

module.exports = { createStaff, getStaffByLocation, updateStaffStatus };
