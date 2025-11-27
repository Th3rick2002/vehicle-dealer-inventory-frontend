import axios from 'axios';

export const Client = axios.create({
  baseURL: import.meta.env.VITE_APP_URL || 'http://localhost:3300/',
  timeout: 5000
});
