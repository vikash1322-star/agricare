import axios from 'axios';

const backendURL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000';

const api = axios.create({
  baseURL: backendURL.replace(/\/$/, '') + '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('agricare_token');

    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;