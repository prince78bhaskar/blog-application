import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor: Automatically attach JWT token to every request
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

// Response interceptor: Handle authentication errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (expired/invalid token)
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message || 'Your session has expired';
      
      // Clear invalid tokens
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Show toast notification
      toast.error(errorMessage + '. Please login again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'colored'
      });
      
      // Redirect to login page (but avoid infinite loop if already on login)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Handle 403 Forbidden errors (access denied)
    if (error.response?.status === 403) {
      toast.error(error.response?.data?.message || 'Access denied', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'colored'
      });
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

export const learningContentAPI = {
  addLearningContent: (data) => api.post('/admin/course-content', data),
  getLearningContentByCourse: (courseId, type) => 
    api.get(`/course-content/${courseId}${type ? `?type=${type}` : ''}`),
  getLearningContentById: (id) => api.get(`/course-content/content/${id}`),
  updateLearningContent: (id, data) => api.put(`/admin/course-content/${id}`, data),
  deleteLearningContent: (id) => api.delete(`/admin/course-content/${id}`),
  getAllLearningContent: (filters) => api.get('/course-content', { params: filters })
};

export const lessonProgressAPI = {
  // Mark a lesson as completed
  markLessonComplete: (data) => {
    console.log('lessonProgressAPI.markLessonComplete called with:', data);
    return api.post('/lesson-progress/complete', data);
  },
  // Get all lesson progress for a student in a course
  getLessonProgress: (courseId) => {
    console.log('lessonProgressAPI.getLessonProgress called for courseId:', courseId);
    return api.get(`/lesson-progress/${courseId}`);
  },
  // Check if a specific lesson is completed
  checkLessonComplete: (lessonId) => {
    console.log('lessonProgressAPI.checkLessonComplete called for lessonId:', lessonId);
    return api.get(`/lesson-progress/check/${lessonId}`);
  }
};

export default api;
