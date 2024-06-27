import axios from 'axios';
import Vue from 'vue';
import { isValidToken, refreshToken } from '@/services/auth.service';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8000/api/',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('condomob@accessToken');

  if (token && isValidToken(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (err) => {
  return Promise.reject(err);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    refreshToken();
  }

  if (error.response.status !== 400) {
    Vue.$toast.open({
      message: error.message,
      type: 'error',
    });
  }

  return Promise.reject(error);
});

export default axiosInstance;
