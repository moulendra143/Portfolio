import axios from 'axios';

// Use your deployed backend URL
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://16.171.148.29:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ❌ Removed JWT interceptor (this was causing 403)
// You can add it back later when you implement login properly

export default api;