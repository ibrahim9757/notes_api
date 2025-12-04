// src/services/api.js
import axios from 'axios';

// ----------------------------------------------------
// 1. Configure the API client
// ----------------------------------------------------

// NOTE: Replace this with your actual backend URL!
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ----------------------------------------------------
// 2. Request Interceptor for JWT
// ----------------------------------------------------

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // Attach the JWT to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ----------------------------------------------------
// 3. Response Interceptor for Token Expiry/Missing Token
// ----------------------------------------------------

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for 401 Unauthorized status (e.g., token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Clear the invalid token and redirect to login
      localStorage.removeItem('jwt_token');
      // Use a simple window redirect as we don't have access to React Router's history/navigate hook here
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ----------------------------------------------------
// 4. Export Core API Functions
// ----------------------------------------------------

// AUTH Endpoints
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const fetchProfile = () => api.get('/auth/me');

// NOTES Endpoints
export const fetchNotes = (params) => api.get('/notes', { params });
export const fetchNoteById = (id) => api.get(`/notes/${id}`);
export const createNote = (data) => api.post('/notes', data);
export const updateNote = (id, data) => api.put(`/notes/${id}`, data);
export const deleteNote = (id) => api.delete(`/notes/${id}`);
export const toggleArchive = (id) => api.patch(`/notes/${id}/archive`);

// CATEGORIES Endpoints
export const fetchCategories = () => api.get('/categories');
export const createCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

export default api;
