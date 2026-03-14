import api from './index';

export const authApi = {
  register: (data: any) => api.post('/auth/register', data).then((r) => r.data),
  login: (data: any) => api.post('/auth/login', data).then((r) => r.data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me').then((r) => r.data),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data: any) => api.post('/auth/reset-password', data),
  changePassword: (data: any) => api.patch('/auth/change-password', data),
};
