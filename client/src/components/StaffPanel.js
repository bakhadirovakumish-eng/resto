import React, { useState } from 'react';
import axios from 'axios';

function StaffPanel({ user }) {
  const [activeTab, setActiveTab] = useState('staff');
  const [staffList, setStaffList] = useState([]);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    password: '',
    role: 'staff'
  });

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/staff', {
        ...newStaff,
        location: user.location
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNewStaff({ name: '', email: '', password: '', role: 'staff' });
      alert('Staff member added successfully');
    } catch (error) {
      alert('Failed to add staff member');
    }
  };

  return (
    <div className="staff-panel">
      <h2>👥 Staff Management</h2>
      
      <div className="tabs">
        <button 
          className={activeTab === 'staff' ? 'active' : ''}
          onClick={() => setActiveTab('staff')}
        >
          Staff List
        </button>
        <button 
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => setActiveTab('add')}
        >
          Add Staff
        </button>
      </div>

      {activeTab === 'add' && (
        <form onSubmit={handleAddStaff} className="add-staff-form">
          <input
            type="text"
            placeholder="Name"
            value={newStaff.name}
            onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newStaff.email}
            onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newStaff.password}
            onChange={(e) => setNewStaff({...newStaff, password: e.target.value})}
            required
          />
          <select 
            value={newStaff.role}
            onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
          >
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
          </select>
          <button type="submit">Add Staff Member</button>
        </form>
      )}

      <style>{`
        .staff-panel {
          padding: 20px;
          background: white;
          border-radius: 8px;
          margin: 20px;
        }
        .tabs {
          display: flex;
          gap: 10px;
          margin: 20px 0;
        }
        .tabs button {
          padding: 10px 20px;
          border: 1px solid #ddd;
          background: #f5f5f5;
          border-radius: 5px;
          cursor: pointer;
        }
        .tabs button.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }
        .add-staff-form {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }
        .add-staff-form input,
        .add-staff-form select {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .add-staff-form button {
          padding: 10px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          grid-column: 1 / -1;
        }
      `}</style>
    </div>
  );
}

export default StaffPanel;
