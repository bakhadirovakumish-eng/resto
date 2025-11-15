import React, { useState } from 'react';
import axios from 'axios';

function AddMenuItem({ user }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
    return <div>Access denied. Only admin/manager can add menu items.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.REACT_APP_API_URL || '';
      await axios.post(`${API_URL}/menu`, {
        name,
        price: Number(price),
        category
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Menu item added successfully!');
      setName('');
      setPrice('');
      setCategory('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add menu item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-menu-item-container">
      <h2>Add New Menu Item</h2>
      <form onSubmit={handleSubmit} className="add-menu-item-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Menu Item'}
        </button>
      </form>
      <style>{`
        .add-menu-item-container {
          max-width: 400px;
          margin: 40px auto;
          background: #fff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .add-menu-item-form input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
        }
        .add-menu-item-form button {
          width: 100%;
          padding: 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
        }
        .add-menu-item-form button:disabled {
          background: #aaa;
        }
        .error {
          color: red;
          margin: 10px 0;
          text-align: center;
        }
        .success {
          color: green;
          margin: 10px 0;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default AddMenuItem;
