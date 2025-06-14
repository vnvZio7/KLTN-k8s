import express from "express";
import {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
} from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
