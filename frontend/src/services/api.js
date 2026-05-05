import axios from 'axios';

// Use your deployed backend URL
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://16.171.148.29:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to every request if it exists
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

// Automatically clean all URLs in response data (replace localhost with server IP)
api.interceptors.response.use(
  (response) => {
    const currentHost = window.location.hostname;
    const dataStr = JSON.stringify(response.data);
    if (dataStr.includes('localhost:8080') || dataStr.includes('127.0.0.1:8080')) {
        const cleanedData = JSON.parse(
            dataStr.replace(/localhost:8080/g, `${currentHost}:8080`)
                   .replace(/127\.0\.0\.1:8080/g, `${currentHost}:8080`)
        );
        response.data = cleanedData;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;