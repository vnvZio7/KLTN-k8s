import express from "express";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Booking Management Routes
// router.get("/", protect, getBookings);
// router.get("/:id", protect, getBookingById);

// router.post("/", protect, createBooking);
// router.put("/:id", protect, updateBooking);
// router.delete("/:id", protect, deleteBooking);

module.exports = router;
