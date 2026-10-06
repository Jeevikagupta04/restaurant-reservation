import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";
import { Admin } from "../models/admin.js";

// Login Admin
export const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter both email and password!", 400));
  }

  try {
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      return next(new ErrorHandler("Invalid email or password!", 401));
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password!", 401));
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || "supersecretjwtkeyforadminpanel_restaurant_2026",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful! Welcome to the Admin Portal.",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// Verify/Get Admin Profile
export const getAdminProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    return next(error);
  }
};
