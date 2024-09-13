import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchAssets = () => API.get('/assets');
export const fetchAsset = (id) => API.get(`/assets/${id}`);
export const addAsset = (newAsset) => API.post('/assets', newAsset);
export const login = (credentials) => API.post('/auth', credentials);
