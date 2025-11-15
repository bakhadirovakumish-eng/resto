import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReservationForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    guestCount: 2,
    reservationDate: '',
    reservationTime: ''
  });
  const [locations, setLocations] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetchTables(selectedLocation);
    }
  }, [selectedLocation]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('/api/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Failed to fetch locations');
    }
  };

  const fetchTables = async (locationId) => {
    try {
      const response = await axios.get(`/api/tables/${locationId}`);
      setTables(response.data.filter(t => t.status === 'available'));
    } catch (error) {
      console.error('Failed to fetch tables');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/reservations', {
        ...formData,
        table: selectedTable,
        location: selectedLocation,
        reservationDate: new Date(`${formData.reservationDate}T${formData.reservationTime}`)
      });
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({
        customerName: '',
        customerPhone: '',
        guestCount: 2,
        reservationDate: '',
        reservationTime: ''
      });
    } catch (error) {
      alert('Failed to create reservation');
    }
  };

  return (
    <div className="reservation-form">
      <h2>🪑 Book a Table</h2>
      {submitted && <div className="success-message">✅ Reservation created successfully!</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location</label>
          <select 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
            required
          >
            <option value="">Select Location</option>
            {locations.map(loc => (
              <option key={loc._id} value={loc._id}>{loc.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Guests</label>
          <select 
            name="guestCount" 
            value={formData.guestCount}
            onChange={handleChange}
          >
            {[1,2,3,4,5,6,8,10].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="reservationDate"
            value={formData.reservationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            name="reservationTime"
            value={formData.reservationTime}
            onChange={handleChange}
            required
          />
        </div>

        {selectedLocation && tables.length > 0 && (
          <div className="form-group">
            <label>Table</label>
            <select 
              value={selectedTable} 
              onChange={(e) => setSelectedTable(e.target.value)}
              required
            >
              <option value="">Select Table</option>
              {tables.map(table => (
                <option key={table._id} value={table._id}>
                  Table {table.number} (Capacity: {table.capacity})
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="submit-btn">Book Table</button>
      </form>

      <style>{`
        .reservation-form {
          max-width: 500px;
          margin: 20px auto;
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .form-group {
          margin: 20px 0;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #333;
        }
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
        }
        .submit-btn {
          width: 100%;
          padding: 12px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 20px;
        }
        .submit-btn:hover {
          background: #218838;
        }
        .success-message {
          background: #d4edda;
          color: #155724;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}

export default ReservationForm;
