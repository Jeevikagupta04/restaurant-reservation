import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Async Thunk: Fetch all reservations
export const fetchReservations = createAsyncThunk(
  "reservations/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (!auth.token) return rejectWithValue("No authentication token available");

    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/reservation/getall`,
        getAuthHeaders(auth.token)
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch reservations"
      );
    }
  }
);

// Async Thunk: Update status
export const updateReservationStatus = createAsyncThunk(
  "reservations/updateStatus",
  async ({ id, status }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/v1/reservation/${id}/status`,
        { status },
        getAuthHeaders(auth.token)
      );
      return { id, status, message: data.message };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update reservation status"
      );
    }
  }
);

// Async Thunk: Delete reservation
export const deleteReservation = createAsyncThunk(
  "reservations/delete",
  async (id, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/v1/reservation/${id}`,
        getAuthHeaders(auth.token)
      );
      return { id, message: data.message };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete reservation"
      );
    }
  }
);

// Async Thunk: Submit new booking (Public or Admin)
export const submitReservation = createAsyncThunk(
  "reservations/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/reservation/send`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to submit reservation"
      );
    }
  }
);

const initialState = {
  reservations: [],
  stats: {
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
  },
  loading: false,
  actionLoading: false,
  error: null,
  searchQuery: "",
  statusFilter: "All",
  dateFilter: "",
};

const reservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },
    clearReservationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload.reservations || [];
        state.stats = action.payload.stats || state.stats;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Status
      .addCase(updateReservationStatus.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateReservationStatus.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { id, status } = action.payload;
        state.reservations = state.reservations.map((item) =>
          item._id === id ? { ...item, status } : item
        );
        // Recalculate stats
        state.stats.confirmed = state.reservations.filter((r) => r.status === "Confirmed").length;
        state.stats.pending = state.reservations.filter((r) => r.status === "Pending").length;
        state.stats.cancelled = state.reservations.filter((r) => r.status === "Cancelled").length;
      })
      .addCase(updateReservationStatus.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.reservations = state.reservations.filter((r) => r.status !== action.payload.id && r._id !== action.payload.id);
        state.stats.total = state.reservations.length;
        state.stats.confirmed = state.reservations.filter((r) => r.status === "Confirmed").length;
        state.stats.pending = state.reservations.filter((r) => r.status === "Pending").length;
        state.stats.cancelled = state.reservations.filter((r) => r.status === "Cancelled").length;
      })

      // Submit
      .addCase(submitReservation.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(submitReservation.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (action.payload.reservation) {
          state.reservations.unshift(action.payload.reservation);
          state.stats.total += 1;
          state.stats.pending += 1;
        }
      })
      .addCase(submitReservation.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchQuery,
  setStatusFilter,
  setDateFilter,
  clearReservationError,
} = reservationSlice.actions;

export default reservationSlice.reducer;
