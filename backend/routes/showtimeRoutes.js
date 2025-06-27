import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware";
import {
  createShowtime,
  deleteShowtime,
  getShowtimeById,
  getShowtimes,
  updateShowtime,
} from "../controllers/showtimeController";

const router = express.Router();

// Showtime Management Routes
router.get("/", protect, getShowtimes);
router.get("/:id", protect, getShowtimeById);

router.post("/", protect, adminOnly, createShowtime);
router.put("/:id", protect, adminOnly, updateShowtime);
router.delete("/:id", protect, adminOnly, deleteShowtime);

module.exports = router;
