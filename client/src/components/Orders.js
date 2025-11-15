import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.log('Demo orders');
      // Use demo data if API fails
      setOrders(getDemoOrders());
    } finally {
      setLoading(false);
    }
  };

  const getDemoOrders = () => [
    {
      _id: '1',
      orderNumber: '001',
      status: 'pending',
      totalPrice: 1200,
      deliveryType: 'dine-in',
      items: [
        { _id: 'i1', name: 'Espresso', price: 300, quantity: 2 },
        { _id: 'i2', name: 'Cappuccino', price: 600, quantity: 1 }
      ],
      createdAt: new Date().toISOString()
    }
  ];

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/orders/${orderId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (error) {
      alert('Failed to update order');
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="orders-container">
      <h2>📦 Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders yet</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.orderNumber}</h3>
                  <span className="order-time">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="order-status">
                  <span className={`status ${order.status}`}>{order.status}</span>
                  <span className="delivery-type">📍 {order.deliveryType}</span>
                </div>
              </div>

              <div className="order-items">
                <h4>Items:</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.price} ₸</td>
                        <td>{item.quantity}</td>
                        <td className="item-total">{item.price * item.quantity} ₸</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="order-total">
                <strong>Total: {order.totalPrice} ₸</strong>
              </div>

              {user.role === 'admin' || user.role === 'manager' ? (
                <div className="admin-controls">
                  <label>Update Status:</label>
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
      
      <style>{`
        .orders-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .no-orders {
          text-align: center;
          color: #999;
          padding: 40px;
        }
        .orders-list {
          display: grid;
          gap: 20px;
        }
        .order-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border-left: 4px solid #667eea;
        }
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        .order-info h3 {
          margin: 0;
          font-size: 18px;
        }
        .order-time {
          display: block;
          font-size: 12px;
          color: #999;
          margin-top: 5px;
        }
        .order-status {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .status {
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          color: white;
          text-transform: uppercase;
        }
        .status.pending { background: #ffc107; color: #333; }
        .status.confirmed { background: #17a2b8; }
        .status.preparing { background: #fd7e14; }
        .status.ready { background: #28a745; }
        .status.delivered { background: #6c757d; }
        .status.cancelled { background: #dc3545; }
        .delivery-type {
          font-size: 12px;
          color: #666;
        }
        .order-items {
          margin: 15px 0;
        }
        .order-items h4 {
          margin: 0 0 10px 0;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .items-table th {
          background: #f5f5f5;
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          font-weight: bold;
        }
        .items-table td {
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
        .item-total {
          font-weight: bold;
          color: #667eea;
        }
        .order-total {
          text-align: right;
          padding: 15px 0;
          border-top: 2px solid #667eea;
          font-size: 16px;
          margin: 15px 0;
        }
        .admin-controls {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 15px;
          background: #f9f9f9;
          border-radius: 5px;
          margin-top: 15px;
        }
        .admin-controls label {
          font-weight: bold;
        }
        .status-select {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Orders;
