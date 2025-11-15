# 🏗️ System Architecture & API Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React Frontend (Port 3000)                          │   │
│  │  - Menu browsing & QR scanning                       │   │
│  │  - Order placement                                   │   │
│  │  - Table reservations                               │   │
│  │  - Dashboard & Analytics                            │   │
│  │  - Staff management                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Node.js/Express Server (Port 5000)                 │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │ Routes:                                     │    │   │
│  │  │ • /api/auth - Authentication               │    │   │
│  │  │ • /api/orders - Order management            │    │   │
│  │  │ • /api/menu - Menu management              │    │   │
│  │  │ • /api/reservations - Table bookings       │    │   │
│  │  │ • /api/staff - Staff management            │    │   │
│  │  │ • /api/inventory - Stock management        │    │   │
│  │  │ • /api/loyalty - Loyalty programs          │    │   │
│  │  │ • /api/locations - Multi-location support  │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │  Middleware:                                        │   │
│  │  • JWT Authentication                              │   │
│  │  • Role-based Access Control                       │   │
│  │  • Request Validation                              │   │
│  │  • Error Handling                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  MongoDB Database                                    │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ Collections:                                  │  │   │
│  │  │ • users - Staff & customer accounts          │  │   │
│  │  │ • menuItems - Menu items with prices         │  │   │
│  │  │ • categories - Menu categories               │  │   │
│  │  │ • modifiers - Item customization options     │  │   │
│  │  │ • orders - Order records                     │  │   │
│  │  │ • reservations - Table bookings              │  │   │
│  │  │ • tables - Table configuration               │  │   │
│  │  │ • inventory - Stock items                    │  │   │
│  │  │ • loyaltyPrograms - Customer rewards         │  │   │
│  │  │ • locations - Multi-location data            │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String ['admin', 'manager', 'staff', 'customer'],
  location: ObjectId (ref: Location),
  phone: String,
  status: String ['active', 'inactive'],
  permissions: [String],
  createdAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique),
  customer: ObjectId (ref: User),
  items: [{
    menuItem: ObjectId (ref: MenuItem),
    quantity: Number,
    modifiers: [String],
    price: Number
  }],
  table: ObjectId (ref: Table),
  totalPrice: Number,
  status: String ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
  paymentMethod: String ['cash', 'card', 'online'],
  paymentStatus: String ['pending', 'completed', 'failed'],
  deliveryType: String ['dine-in', 'takeaway', 'delivery'],
  location: ObjectId (ref: Location),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Reservations Collection
```javascript
{
  _id: ObjectId,
  customer: ObjectId (ref: User),
  customerName: String,
  customerPhone: String,
  table: ObjectId (ref: Table),
  location: ObjectId (ref: Location),
  guestCount: Number,
  reservationDate: Date,
  duration: Number (minutes, default: 120),
  status: String ['pending', 'confirmed', 'completed', 'cancelled'],
  notes: String,
  createdAt: Date
}
```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/login` | User login | No |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/orders` | Create order | JWT |
| GET | `/api/orders` | Get orders | JWT |
| PATCH | `/api/orders/:orderId` | Update order status | JWT |

### Menu
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/menu/:locationId` | Get menu by location | No |
| POST | `/api/menu` | Create menu item | JWT (admin/manager) |

### Reservations
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/reservations` | Create reservation | No |
| GET | `/api/reservations/:locationId` | Get reservations | JWT |

### Staff
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/staff` | Create staff member | JWT (admin/manager) |
| GET | `/api/staff/:locationId` | Get staff by location | JWT |
| PATCH | `/api/staff/:staffId` | Update staff status | JWT (admin/manager) |

### Inventory
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/inventory` | Create inventory item | JWT (admin/manager) |
| GET | `/api/inventory/:locationId` | Get inventory | JWT |
| GET | `/api/inventory/:locationId/low-stock` | Get low stock items | JWT |
| PATCH | `/api/inventory/:itemId` | Update quantity | JWT (admin/manager) |

### Loyalty
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/loyalty` | Create loyalty account | JWT |
| GET | `/api/loyalty/:customerId` | Get loyalty account | JWT |
| PATCH | `/api/loyalty/:customerId/points` | Add points | JWT |

### Locations
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/locations` | Create location | JWT (admin) |
| GET | `/api/locations` | Get all locations | No |
| GET | `/api/locations/:locationId` | Get location details | No |

## User Roles & Permissions

### Admin
- Full system access
- Create/manage locations
- Manage all staff
- View all reports
- Configure system settings

### Manager
- Location-specific management
- Staff management for location
- Inventory management
- View location reports
- Table/reservation management

### Staff
- View orders
- Update order status
- Process payments
- View menu
- Manage tables

### Customer
- Browse menu
- Place orders
- Make reservations
- View loyalty status
- Track orders

## Integration Points

### Payment Gateway
```javascript
// Stripe integration example
POST /api/orders/:orderId/payment
{
  paymentMethodId: "pm_...",
  amount: 5000
}
```

### Notification System (Future)
- Email notifications for orders
- SMS alerts for reservations
- Push notifications for customers

### Third-party Services
- Stripe (payments)
- SendGrid (email)
- Twilio (SMS)
- Firebase (push notifications)

## Performance Considerations

1. **Database Indexing**
   - Index on `email` in users
   - Index on `location` for queries
   - Index on `createdAt` for sorting

2. **Caching**
   - Cache menu data
   - Cache location information
   - Redis for session storage

3. **Pagination**
   - Implement pagination for orders/reservations
   - Limit results to 50 items per page

4. **Query Optimization**
   - Use `.lean()` for read-only queries
   - Select specific fields
   - Use aggregation pipeline for reports

## Security Best Practices

1. **Authentication**
   - JWT tokens (7 day expiry)
   - Password hashing with bcrypt
   - Email verification (optional)

2. **Authorization**
   - Role-based access control
   - Resource ownership checks
   - Permission validation

3. **Data Protection**
   - HTTPS only in production
   - Environment variables for secrets
   - Input validation
   - SQL injection prevention
   - XSS protection

4. **API Security**
   - Rate limiting
   - CORS configuration
   - Helmet.js security headers
   - Request validation

## Deployment Checklist

- [ ] Set production environment variables
- [ ] Configure HTTPS
- [ ] Set up MongoDB Atlas
- [ ] Configure payment gateway
- [ ] Set up email service
- [ ] Enable database backups
- [ ] Configure CDN for static assets
- [ ] Set up logging and monitoring
- [ ] Configure error tracking (Sentry)
- [ ] Set up automated testing
- [ ] Configure CI/CD pipeline

## Monitoring & Logging

```javascript
// Logging setup
const logger = require('winston');

// Monitor:
- API response times
- Database query performance
- Error rates
- User engagement metrics
- Revenue tracking
```

## Future Enhancements

1. **Real-time Features**
   - WebSocket for live order updates
   - Real-time table status
   - Live kitchen display

2. **Mobile App**
   - React Native implementation
   - Offline functionality
   - Native push notifications

3. **Advanced Analytics**
   - Machine learning for demand forecasting
   - Customer segmentation
   - Predictive inventory

4. **Payment Integration**
   - Halyk Bank integration
   - Multiple currency support
   - Subscription billing

5. **Internationalization**
   - Multi-language support
   - Regional adaptations
   - Currency localization
