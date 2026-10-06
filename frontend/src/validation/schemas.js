import * as yup from "yup";

/**
 * Reservation Validation Schema
 * Enforces business constraints including strict 10-digit phone number validation
 */
export const reservationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters")
    .max(30, "First name cannot exceed 30 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters")
    .max(30, "Last name cannot exceed 30 characters")
    .required("Last name is required"),
  email: yup
    .string()
    .trim()
    .email("Please provide a valid email address")
    .required("Email address is required"),
  phone: yup
    .string()
    .trim()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 numeric digits")
    .required("Phone number is required"),
  date: yup
    .string()
    .required("Reservation date is required"),
  time: yup
    .string()
    .required("Reservation time is required"),
});

/**
 * Admin Login Validation Schema
 */
export const adminLoginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

/**
 * Status Update Validation Schema
 */
export const statusUpdateSchema = yup.object().shape({
  status: yup
    .string()
    .oneOf(["Pending", "Confirmed", "Cancelled"], "Invalid status selected")
    .required("Status is required"),
});
