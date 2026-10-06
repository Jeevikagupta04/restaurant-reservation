import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

// Async thunk for Admin Login
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/v1/admin/login`, credentials);
      if (data.success && data.token) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.admin));
        return { token: data.token, admin: data.admin, message: data.message };
      }
      return rejectWithValue(data.message || "Login failed");
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Invalid credentials. Please try again."
      );
    }
  }
);

// Initial state hydrated from localStorage
const storedToken = localStorage.getItem("adminToken") || null;
let storedUser = null;
try {
  storedUser = JSON.parse(localStorage.getItem("adminUser")) || null;
} catch {
  storedUser = null;
}

const initialState = {
  token: storedToken,
  adminUser: storedUser,
  isAuthenticated: Boolean(storedToken),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      state.token = null;
      state.adminUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.adminUser = action.payload.admin;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
