import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
    login: (data) => {
      console.log('authAPI.login data:', data);
      return api.post('/auth/login', data);
    },
  getProfile: () => api.get('/auth/profile'),
  logout: () => api.post('/auth/logout')
};

export const courseAPI = {
  getAllCourses: () => api.get('/courses'),
  getCourseById: (id) => api.get(`/courses/${id}`),
  getCourseVideos: (id) => api.get(`/courses/${id}/videos`),
  getCourseNotes: (id) => api.get(`/courses/${id}/notes`),
  createCourse: (data) => {
    console.log('courseAPI.createCourse called with:', data);
    return api.post('/courses', data);
  },
  updateCourse: (id, data) => {
    console.log('courseAPI.updateCourse called with ID:', id, 'data:', data);
    return api.put(`/courses/${id}`, data);
  },
  deleteCourse: (id) => {
    console.log('courseAPI.deleteCourse called with ID:', id);
    return api.delete(`/courses/${id}`);
  }
};

export const paymentAPI = {
  createOrder: (data) => api.post('/payment/create-order', data),
  verifyPayment: (data) => api.post('/payment/verify', data)
};

export const dashboardAPI = {
  getDashboardData: () => api.get('/dashboard'),
  getMyCourses: () => api.get('/dashboard/my-courses'),
  updateProgress: (data) => api.post('/dashboard/progress', data)
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getAllStudents: (search) => api.get(`/admin/students${search ? `?search=${search}` : ''}`),
  getAllCourses: (search) => api.get(`/admin/courses${search ? `?search=${search}` : ''}`),
  deleteStudent: (id) => api.delete(`/admin/students/${id}`)
};

export default api;
