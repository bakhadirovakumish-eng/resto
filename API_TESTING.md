# API Testing Guide

## Using Postman

### 1. Import Collection
Import the provided `postman-collection.json` into Postman

### 2. Environment Setup
Create environment with variables:
```json
{
  "base_url": "http://localhost:5000/api",
  "token": "your_jwt_token_here"
}
```

## Testing Examples

### 1. Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Test User",
    "email": "test@example.com",
    "role": "customer"
  }
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Get Menu
```
GET http://localhost:5000/api/menu/1
```

### 4. Create Order
```
POST http://localhost:5000/api/orders
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "items": [
    {
      "menuItem": "507f1f77bcf86cd799439012",
      "quantity": 2
    }
  ],
  "location": "1",
  "deliveryType": "dine-in"
}
```

### 5. Create Reservation
```
POST http://localhost:5000/api/reservations
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerPhone": "+77012345678",
  "table": "507f1f77bcf86cd799439013",
  "guestCount": 4,
  "reservationDate": "2024-01-15T19:00:00Z",
  "location": "1"
}
```

## Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get menu
curl http://localhost:5000/api/menu/1

# Create order (replace TOKEN with actual token)
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"menuItem": "id", "quantity": 1}],
    "location": "1",
    "deliveryType": "dine-in"
  }'
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Email already exists"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "error": "Detailed error message"
}
```

## Load Testing

Use Apache JMeter or Artillery for load testing:

```bash
# Artillery example
npm install -g artillery

# Create test.yml
# Run tests
artillery run test.yml
```

## Security Testing

1. **SQL Injection Testing**: Try injecting SQL in text fields
2. **XSS Testing**: Try adding script tags in inputs
3. **CSRF Testing**: Test unauthorized state-changing operations
4. **Authentication Testing**: Try accessing protected endpoints without token
5. **Authorization Testing**: Try accessing resources you don't own

## Performance Testing

Monitor:
- Response time < 500ms
- Concurrent users support
- Database query optimization
- Memory usage
