import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import reservationReducer from "./slices/reservationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reservations: reservationReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
