import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware";
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookings,
  updateBooking,
} from "../controllers/bookingController";

const router = express.Router();

// Booking Management Routes
router.get("/", protect, getBookings);
router.get("/:id", protect, getBookingById);

router.post("/", protect, createBooking);
router.put("/:id", protect, adminOnly, updateBooking);
router.delete("/:id", protect, adminOnly, deleteBooking);

module.exports = router;
