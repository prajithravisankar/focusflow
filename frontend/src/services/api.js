import axios from "axios";

// Configure API base URL
const getApiUrl = () => {
  // If VITE_API_URL is set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // If in development, use localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:5050/api';
  }
  
  // In production, you can either:
  // 1. Use your Railway backend URL (replace with your actual URL)
  // 2. Or use relative path '/api' if backend is deployed to same domain
  return 'https://your-railway-app-name.railway.app/api'; // Replace with your Railway URL
};

const api = axios.create({
  baseURL: getApiUrl(),
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Only redirect if not already on login page to prevent infinite redirects
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Authentication API functions
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const fetchUserDetails = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

// Task API functions
export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

// Calendar API functions
export const getCalendarData = async (startDate, endDate) => {
  const response = await api.get(`/tasks/calendar?startDate=${startDate}&endDate=${endDate}`);
  return response.data;
};

export const getTasksByDate = async (date) => {
  const response = await api.get(`/tasks/date/${date}`);
  return response.data;
};

// Session API functions
export const startSession = async (sessionData) => {
  const response = await api.post("/sessions/start", sessionData);
  return response.data;
};

export const updateSession = async (sessionId, sessionData) => {
  const response = await api.put(`/sessions/${sessionId}`, sessionData);
  return response.data;
};

export const completeSession = async (sessionId) => {
  const response = await api.post(`/sessions/${sessionId}/complete`);
  return response.data;
};

export const getSessionHistory = async (params = {}) => {
  const response = await api.get("/sessions", { params });
  return response.data;
};

export const getTaskAnalytics = async (taskId) => {
  const response = await api.get(`/sessions/analytics/task/${taskId}`);
  return response.data;
};

export const getUserProductivity = async (params = {}) => {
  const response = await api.get("/sessions/analytics/user", { params });
  return response.data;
};

export default api;