import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use the environment variable
});

export default api;