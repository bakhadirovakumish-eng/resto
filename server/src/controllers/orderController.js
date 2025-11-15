const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

const createOrder = async (req, res) => {
  try {
    const { items, table, notes, deliveryType, paymentMethod } = req.body;
    
    let totalPrice = 0;
    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
      totalPrice += menuItem.price * item.quantity;
    }

    const orderNumber = 'ORD-' + Date.now();
    const order = new Order({
      orderNumber,
      customer: req.user.id,
      items,
      table,
      totalPrice,
      notes,
      deliveryType: deliveryType || 'dine-in',
      paymentMethod: paymentMethod || 'cash',
      location: req.body.location
    });

    await order.save();
    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ location: req.body.location })
      .populate('items.menuItem')
      .populate('table')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus };
