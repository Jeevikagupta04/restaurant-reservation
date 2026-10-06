import mongoose from "mongoose";
import validator from "validator";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Restaurant Admin",
  },
  email: {
    type: String,
    required: [true, "Please provide admin email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
