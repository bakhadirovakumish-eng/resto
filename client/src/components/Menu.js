import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu({ user }) {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchMenu();
  }, [user]);

  const fetchMenu = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/menu', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMenuItems(response.data);
    } catch (error) {
      console.log('Using demo menu data');
      setMenuItems(getDemoMenu());
    } finally {
      setLoading(false);
    }
  };

  const getDemoMenu = () => [
    { _id: '1', name: 'Espresso', price: 300, category: '1' },
    { _id: '2', name: 'Americano', price: 400, category: '1' },
    { _id: '3', name: 'Cappuccino', price: 500, category: '1' },
    { _id: '4', name: 'Caesar Salad', price: 1500, category: '2' },
    { _id: '5', name: 'Burger', price: 2000, category: '2' }
  ];

  const addToCart = (item) => {
    const existing = cart.find(c => c._id === item._id);
    if (existing) {
      setCart(cart.map(c => 
        c._id === item._id 
          ? { ...c, quantity: c.quantity + 1 }
          : c
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(c => c._id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(c =>
        c._id === itemId ? { ...c, quantity } : c
      ));
    }
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/orders', {
        items: cart.map(c => ({ menuItem: c._id, quantity: c.quantity })),
        location: '1',
        deliveryType: 'dine-in'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCart([]);
      alert('Order placed successfully!');
    } catch (error) {
      alert('Failed to place order');
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);


  // Для отладки: выводим, что приходит из API
  console.log('menuItems:', menuItems);

  if (loading) return <div className="menu-loading">Loading menu...</div>;

  return (
    <div className="menu-container">
      <div className="menu-grid">
        {(Array.isArray(menuItems) ? menuItems : []).map(item => (
          <div key={item._id} className="menu-card">
            <h3>{item.name}</h3>
            <p className="price">{item.price} ₸</p>
            {item.description && <p className="description">{item.description}</p>}
            <button onClick={() => addToCart(item)}>+ Add to Cart</button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-panel">
          <h2>🛒 Cart</h2>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <div className="item-info">
                  <span>{item.name}</span>
                  <span className="item-price">{item.price * item.quantity} ₸</span>
                </div>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total: {totalPrice} ₸</strong>
          </div>
          <button className="order-btn" onClick={placeOrder}>Place Order</button>
        </div>
      )}

      <style>{`
        .menu-container {
          padding: 20px;
        }
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .menu-card {
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .menu-card:hover {
          transform: translateY(-5px);
        }
        .menu-card h3 {
          margin: 0 0 10px 0;
        }
        .menu-card .price {
          font-size: 18px;
          font-weight: bold;
          color: #667eea;
        }
        .menu-card .description {
          font-size: 12px;
          color: #666;
          margin: 5px 0;
        }
        .menu-card button {
          width: 100%;
          padding: 10px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }
        .cart-panel {
          position: fixed;
          right: 20px;
          bottom: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.15);
          width: 300px;
          padding: 20px;
          max-height: 70vh;
          overflow-y: auto;
        }
        .cart-items {
          margin: 15px 0;
        }
        .cart-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        .item-info {
          display: flex;
          flex-direction: column;
        }
        .quantity-control {
          display: flex;
          gap: 5px;
          align-items: center;
        }
        .quantity-control button {
          width: 25px;
          padding: 2px;
          border: 1px solid #ddd;
          background: #f5f5f5;
          border-radius: 3px;
          cursor: pointer;
        }
        .cart-total {
          padding: 15px 0;
          border-top: 2px solid #667eea;
          font-size: 18px;
        }
        .order-btn {
          width: 100%;
          padding: 12px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}

export default Menu;
