# 🚀 Quick Start Guide

## System Requirements
- **Node.js**: 14.0.0 or higher
- **MongoDB**: 4.4.0 or higher (local or cloud)
- **npm**: 6.0.0 or higher

## Installation Steps

### Step 1: MongoDB Setup

**Option A: Local MongoDB**
```bash
# Download from https://www.mongodb.com/try/download/community
# Install and start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env` with connection string

### Step 2: Server Installation

```bash
cd server

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env with your settings
# Most important: MONGODB_URI
```

### Step 3: Client Installation

```bash
cd client

# Install dependencies
npm install
```

### Step 4: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
Expected output:
```
MongoDB connected
Server running on port 5000
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```
Expected output:
```
On Your Network: http://localhost:3000
```

### Step 5: Access the Application

1. Open browser to `http://localhost:3000`
2. Register new account
3. Login with your credentials
4. Start using the system!

## Demo Credentials

```
Email: demo@cafe.kz
Password: demo123
```

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
# Check status
mongosh

# If not running, start it
mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change port in `.env`
```
PORT=5001
```

### npm install issues
```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Features Overview

### 🎯 Main Dashboard
- Real-time order statistics
- Revenue tracking
- Active orders display
- Staff management

### 📱 QR Menu System
- Table-based menu access
- Item customization
- Real-time availability

### 🛒 Ordering System
- Add items to cart
- Quantity adjustment
- Multiple payment methods
- Order tracking

### 👥 Staff Management
- Role-based access control
- Shift management
- Performance tracking

### 📊 Analytics
- Sales reports
- Top items analysis
- Customer trends
- Revenue forecasting

### 🪑 Table Management
- Real-time table status
- Reservation system
- QR code generation

### 🎁 Loyalty Program
- Points system
- Tier-based rewards
- Customer history

## Next Steps

1. **Customize Menu**: Add your café's menu items
2. **Configure Locations**: Set up multiple café locations
3. **Add Staff**: Create staff accounts with appropriate roles
4. **Set Up Payments**: Configure payment gateway (optional)
5. **Customize Settings**: Adjust system to your needs

## Support & Documentation

- See `README.md` for detailed API documentation
- Check `/docs` folder for additional guides
- Visit development server: http://localhost:5000/api/health

## Production Deployment

For deploying to production:

1. **Backend**: Deploy to Heroku, AWS, or DigitalOcean
2. **Frontend**: Deploy to Vercel, Netlify, or AWS S3 + CloudFront
3. **Database**: Use MongoDB Atlas or similar managed service
4. **Environment**: Update all URLs and API endpoints

Contact your hosting provider for specific deployment steps.
