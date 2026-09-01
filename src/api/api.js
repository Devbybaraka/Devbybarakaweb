import axios from 'axios';

// This uses the Render URL when deployed, and localhost when developing.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the admin token to every request when one exists.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('devbybaraka_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
