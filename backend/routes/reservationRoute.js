import express from "express";
import {
  send_reservation,
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
} from "../controller/reservation.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Public route - anyone can submit a reservation from the website
router.post("/send", send_reservation);

// Protected routes - only logged-in Admin can view and manage reservations
router.get("/getall", isAdminAuthenticated, getAllReservations);
router.put("/:id/status", isAdminAuthenticated, updateReservationStatus);
router.delete("/:id", isAdminAuthenticated, deleteReservation);

export default router;
