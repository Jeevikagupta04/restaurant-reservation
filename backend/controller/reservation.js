import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservation.js";


export const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  if (!/^\d{10}$/.test(phone)) {
    return next(new ErrorHandler("Phone number must contain exactly 10 digits!", 400));
  }

  try {
    const reservation = await Reservation.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
      reservation,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};

export const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    
    // Quick calculations for stats
    const total = reservations.length;
    const confirmed = reservations.filter((r) => r.status === "Confirmed").length;
    const pending = reservations.filter((r) => r.status === "Pending").length;
    const cancelled = reservations.filter((r) => r.status === "Cancelled").length;

    res.status(200).json({
      success: true,
      count: total,
      stats: { total, confirmed, pending, cancelled },
      reservations,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateReservationStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
    return next(new ErrorHandler("Invalid status provided!", 400));
  }

  try {
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return next(new ErrorHandler("Reservation not found!", 404));
    }

    res.status(200).json({
      success: true,
      message: `Reservation status updated to ${status}!`,
      reservation,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteReservation = async (req, res, next) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return next(new ErrorHandler("Reservation not found!", 404));
    }

    res.status(200).json({
      success: true,
      message: "Reservation Deleted Successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

export default send_reservation;

