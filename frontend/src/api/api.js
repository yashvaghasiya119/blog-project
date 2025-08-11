import axios from "axios";

// Base API instance for user routes
const userApi = axios.create({
  baseURL: "/api/user", // Match backend route structure
  timeout: 10000,                    // 10 second timeout
  headers: {
    "Content-Type": "application/json"
  }
});

// Base API instance for blog routes
const blogApi = axios.create({
  baseURL: "/api/blog", // Match backend route structure
  timeout: 10000,                    // 10 second timeout
  headers: {
    "Content-Type": "application/json"
  }
});

// Base API instance for comment routes
const commentApi = axios.create({
  baseURL: "/api/comment", // Match backend route structure
  timeout: 10000,                    // 10 second timeout
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor to add auth token
const addAuthToken = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

userApi.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));
blogApi.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));
commentApi.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));

// Response interceptor for error handling
const handleResponseError = (error) => {
  if (error.response?.status === 401) {
    // Unauthorized - clear token but don't redirect automatically
    // Let the components handle the authentication state
    localStorage.removeItem('token');
  }
  return Promise.reject(error);
};

userApi.interceptors.response.use((response) => response, handleResponseError);
blogApi.interceptors.response.use((response) => response, handleResponseError);
commentApi.interceptors.response.use((response) => response, handleResponseError);

export { userApi, blogApi, commentApi };
export default userApi; // Default export for backward compatibility
