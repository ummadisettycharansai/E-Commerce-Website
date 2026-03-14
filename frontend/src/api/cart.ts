import api from './index';

export const cartApi = {
  getCart: () => api.get('/cart').then((r) => r.data),
  addItem: (data: any) => api.post('/cart', data).then((r) => r.data),
  updateItem: (itemId: string, quantity: number) => api.put(`/cart/${itemId}`, { quantity }).then((r) => r.data),
  removeItem: (itemId: string) => api.delete(`/cart/${itemId}`),
  clearCart: () => api.delete('/cart'),
};

export const ordersApi = {
  getOrders: (params?: any) => api.get('/orders', { params }).then((r) => r.data),
  getOrder: (id: string) => api.get(`/orders/${id}`).then((r) => r.data),
  createOrder: (data: any) => api.post('/orders', data).then((r) => r.data),
  cancelOrder: (id: string) => api.post(`/orders/${id}/cancel`).then((r) => r.data),
};

export const paymentsApi = {
  createIntent: (amount: number) => api.post('/payments/intent', { amount }).then((r) => r.data),
};

export const addressesApi = {
  getAddresses: () => api.get('/addresses').then((r) => r.data),
  addAddress: (data: any) => api.post('/addresses', data).then((r) => r.data),
  updateAddress: (id: string, data: any) => api.put(`/addresses/${id}`, data).then((r) => r.data),
  deleteAddress: (id: string) => api.delete(`/addresses/${id}`),
  setDefault: (id: string) => api.patch(`/addresses/${id}/default`).then((r) => r.data),
};

export const wishlistApi = {
  getWishlist: () => api.get('/wishlist').then((r) => r.data),
  addToWishlist: (productId: string) => api.post(`/wishlist/${productId}`).then((r) => r.data),
  removeFromWishlist: (productId: string) => api.delete(`/wishlist/${productId}`),
};

export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard').then((r) => r.data),
  getOrders: (params?: any) => api.get('/admin/orders', { params }).then((r) => r.data),
  getUsers: (params?: any) => api.get('/admin/users', { params }).then((r) => r.data),
  updateUserRole: (id: string, role: string) => api.patch(`/admin/users/${id}`, { role }).then((r) => r.data),
  updateOrderStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }).then((r) => r.data),
};
