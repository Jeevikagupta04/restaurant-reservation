import express from "express";
import { loginAdmin, getAdminProfile } from "../controller/admin.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/me", isAdminAuthenticated, getAdminProfile);

export default router;
