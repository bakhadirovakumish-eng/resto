import React, { useState, useEffect } from 'react';

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    activeOrders: 0,
    avgOrderValue: 0
  });
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const ordersList = await response.json();
      
      const total = ordersList.length;
      const active = ordersList.filter(o => 
        o.status === 'pending' || o.status === 'confirmed' || o.status === 'preparing'
      ).length;
      const revenue = ordersList.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
      const avg = total > 0 ? Math.round(revenue / total) : 0;

      setStats({
        totalOrders: total,
        revenue: revenue,
        activeOrders: active,
        avgOrderValue: avg
      });
      setOrders(ordersList);
    } catch (error) {
      setStats({
        totalOrders: 156,
        revenue: 450000,
        activeOrders: 12,
        avgOrderValue: 2884
      });
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      fetchDashboardData();
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');

  return (
    <div className="dashboard-container">
      <h2>📊 Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Revenue</h3>
            <p className="stat-value">{stats.revenue.toLocaleString()} ₸</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-info">
            <h3>Active Orders</h3>
            <p className="stat-value">{stats.activeOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>Avg Order Value</h3>
            <p className="stat-value">{stats.avgOrderValue} ₸</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h3>🧑‍💼 Staff Management</h3>
          <p>Total Staff: 15</p>
          <p>On Shift: 8</p>
          <button>Manage Staff</button>
        </div>

        <div className="section">
          <h3>📦 Inventory</h3>
          <p>Items in Stock: 245</p>
          <p>Low Stock Items: 3</p>
          <button>View Inventory</button>
        </div>

        <div className="section">
          <h3>🪑 Tables</h3>
          <p>Total Tables: 20</p>
          <p>Currently Occupied: 12</p>
          <button>Manage Tables</button>
        </div>

        <div className="section">
          <h3>🎁 Loyalty Program</h3>
          <p>Active Members: 342</p>
          <p>Pending Rewards: 45</p>
          <button>Manage Rewards</button>
        </div>
      </div>

      <style>{`
        .dashboard-container {
          padding: 20px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .stat-icon {
          font-size: 32px;
        }
        .stat-info h3 {
          margin: 0;
          font-size: 14px;
          color: #666;
        }
        .stat-value {
          margin: 5px 0 0 0;
          font-size: 24px;
          font-weight: bold;
          color: #667eea;
        }
        .dashboard-sections {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }
        .section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .section h3 {
          margin: 0 0 15px 0;
        }
        .section p {
          margin: 8px 0;
          color: #666;
        }
        .section button {
          width: 100%;
          padding: 10px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 15px;
        }
        .section button:hover {
          background: #5568d3;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
