import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

/**
 * Pre-configured Axios instance
 * Automatically attaches JWT authentication headers and manages credentials
 */
export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor: Attach Admin Token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Auto-handle session expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
    }
    return Promise.reject(error);
  }
);

// High-level API Helper Functions
export const reservationApi = {
  // Public: Send new dining reservation
  create: (data) => api.post("/api/v1/reservation/send", data),

  // Authenticated: Fetch all reservations with stats
  getAll: () => api.get("/api/v1/reservation/getall"),

  // Authenticated: Update reservation status (Pending -> Confirmed / Cancelled)
  updateStatus: (id, status) => api.put(`/api/v1/reservation/${id}/status`, { status }),

  // Authenticated: Permanently delete reservation
  delete: (id) => api.delete(`/api/v1/reservation/${id}`),

  // Admin Login
  login: (credentials) => api.post("/api/v1/admin/login", credentials),

  // Health check endpoint
  health: () => api.get("/api/v1/health"),
};

export default api;
