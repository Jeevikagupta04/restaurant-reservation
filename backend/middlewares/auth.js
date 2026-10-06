import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { Admin } from "../models/admin.js";

export const isAdminAuthenticated = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken;
  }

  if (!token) {
    return next(
      new ErrorHandler("Access denied. Please login to access the admin portal.", 401)
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretjwtkeyforadminpanel_restaurant_2026"
    );

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return next(new ErrorHandler("Admin user no longer exists.", 401));
    }

    req.admin = admin;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired session token. Please login again.", 401));
  }
};
