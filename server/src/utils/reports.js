const Order = require('../models/Order');
const Inventory = require('../models/Inventory');

const generateSalesReport = async (locationId, startDate, endDate) => {
  const orders = await Order.find({
    location: locationId,
    createdAt: { $gte: startDate, $lte: endDate },
    paymentStatus: 'completed'
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue,
    orders
  };
};

const generateInventoryAlert = async (locationId) => {
  const lowStockItems = await Inventory.find({
    location: locationId,
    $expr: { $lt: ['$quantity', '$minQuantity'] }
  });

  return lowStockItems;
};

module.exports = { generateSalesReport, generateInventoryAlert };
