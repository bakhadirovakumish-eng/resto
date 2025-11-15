# 🍔 Café Management System

A comprehensive web-based management system for cafés with QR menu, online ordering, payments, staff management, inventory, analytics, and more.

## Features

### 📱 Customer Features
- **QR-меню**: Scan QR codes on tables to access digital menu
- **Онлайн-заказ**: Place orders directly from the menu
- **Программы лояльности**: Earn and redeem loyalty points

### 🏪 Business Features
- **Персоналды басқару**: Manage staff members and permissions
- **Бронирование столов**: Table reservation system
- **Меню мен модификаторлар**: Create and manage menu items with customizable modifiers
- **Склад және калькуляция**: Inventory and ingredient management
- **Отчёты мен аналитика**: Generate detailed reports and analytics
- **Финансовый учёт**: Track financial transactions
- **Кассовые смены**: Manage cash shifts and registers
- **Права доступа**: Role-based access control
- **Бірнеше нүктені басқару**: Multi-location support

### 💳 Payment
- **Онлайн-оплата**: Integrated payment processing
- Cash, card, and online payment methods

## Project Structure

```
café-management-system/
├── server/                 # Node.js/Express backend
│   ├── src/
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API endpoints
│   │   ├── controllers/   # Business logic
│   │   └── middleware/    # Auth, validation
│   ├── package.json
│   └── .env.example
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   └── App.js
│   └── package.json
│
└── shared/               # Shared utilities
```

## Prerequisites

- Node.js 14+
- MongoDB 4.4+
- npm or yarn

## Installation

### Backend Setup

```bash
cd server
npm install

# Create .env file
cp .env.example .env

# Update .env with your values
# - MongoDB URI
# - JWT Secret
# - Stripe keys (optional)
# - Email credentials (optional)

# Start server
npm run dev
```

### Frontend Setup

```bash
cd client
npm install

# Start React development server
npm start
```

## Environment Variables

### Server (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cafe_management
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_PUBLISHABLE_KEY=your_stripe_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Menu
- `GET /api/menu/:locationId` - Get menu by location
- `POST /api/menu` - Create menu item (admin/manager)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get orders
- `PATCH /api/orders/:orderId` - Update order status

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/:locationId` - Get reservations

## User Roles

- **Admin**: Full system access
- **Manager**: Location management
- **Staff**: Order processing and table management
- **Customer**: Menu browsing and ordering

## Running the Application

1. **Start MongoDB**
```bash
# Windows
mongod
```

2. **Start Backend Server** (Terminal 1)
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

3. **Start Frontend** (Terminal 2)
```bash
cd client
npm start
# Client runs on http://localhost:3000
```

## Testing

### Create test user
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Create order
```bash
POST http://localhost:5000/api/orders
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "items": [
    {
      "menuItem": "menu_item_id",
      "quantity": 1
    }
  ],
  "location": "location_id",
  "deliveryType": "dine-in"
}
```

## Future Enhancements

- [ ] Payment gateway integration (Stripe, Halyk Bank)
- [ ] SMS/Email notifications
- [ ] Advanced analytics and reporting
- [ ] Mobile app (React Native)
- [ ] Real-time order tracking
- [ ] QR code generation and management
- [ ] Delivery management
- [ ] Customer reviews and ratings
- [ ] Promotional campaigns
- [ ] Kitchen display system (KDS)

## License

ISC

## Support

For issues or questions, please contact support or open an issue on the repository.
