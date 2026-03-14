import api from './index';

export const productsApi = {
  getProducts: (params?: any) => api.get('/products', { params }).then((r) => r.data),
  getProduct: (slug: string) => api.get(`/products/${slug}`).then((r) => r.data),
  createProduct: (data: any) => api.post('/products', data).then((r) => r.data),
  updateProduct: (id: string, data: any) => api.put(`/products/${id}`, data).then((r) => r.data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  uploadImages: (id: string, files: FormData) => api.post(`/products/${id}/images`, files),
  getReviews: (id: string) => api.get(`/products/${id}/reviews`).then((r) => r.data),
  addReview: (id: string, data: any) => api.post(`/products/${id}/reviews`, data).then((r) => r.data),
  deleteReview: (id: string) => api.delete(`/reviews/${id}`),
};

export const categoriesApi = {
  getCategories: () => api.get('/categories').then((r) => r.data),
  createCategory: (data: any) => api.post('/categories', data).then((r) => r.data),
  updateCategory: (id: string, data: any) => api.put(`/categories/${id}`, data).then((r) => r.data),
  deleteCategory: (id: string) => api.delete(`/categories/${id}`),
};
