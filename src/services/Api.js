// src/services/api.js
import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 5000
});

// Interceptor for logging
Api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default Api;