const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const staffRoutes = require('./routes/staffRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const loyaltyRoutes = require('./routes/loyaltyRoutes');
const locationRoutes = require('./routes/locationRoutes');
const connectDB = require('./config/database');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Database connection
connectDB();

// Root endpoint - API info
app.get('/', (req, res) => {
  res.json({
    message: 'Café Management System API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
      },
      menu: {
        list: 'GET /api/menu',
        create: 'POST /api/menu',
        update: 'PUT /api/menu/:id',
        delete: 'DELETE /api/menu/:id',
      },
      orders: {
        list: 'GET /api/orders',
        create: 'POST /api/orders',
      },
      reservations: {
        list: 'GET /api/reservations',
        create: 'POST /api/reservations',
      },
      staff: 'GET /api/staff, POST /api/staff',
      inventory: 'GET /api/inventory, POST /api/inventory',
      loyalty: 'GET /api/loyalty, POST /api/loyalty',
      locations: 'GET /api/locations, POST /api/locations',
    },
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/locations', locationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
