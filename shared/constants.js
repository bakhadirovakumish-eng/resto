// Shared API constants
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  MENU: {
    GET: '/menu/:locationId',
    CREATE: '/menu'
  },
  ORDERS: {
    CREATE: '/orders',
    GET: '/orders',
    UPDATE: '/orders/:orderId'
  },
  RESERVATIONS: {
    CREATE: '/reservations',
    GET: '/reservations/:locationId'
  }
};

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  CUSTOMER: 'customer'
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const DELIVERY_TYPES = {
  DINE_IN: 'dine-in',
  TAKEAWAY: 'takeaway',
  DELIVERY: 'delivery'
};
