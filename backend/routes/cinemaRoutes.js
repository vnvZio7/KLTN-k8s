import express from "express";
import { adminOnly, protect } from "..//middlewares/authMiddleware";
import {
  createCinema,
  deleteCinema,
  getCinemaById,
  getCinemas,
  updateCinema,
} from "../controllers/cinemaController";

const router = express.Router();

// Cinema Management Routes
router.get("/", protect, getCinemas);
router.get("/:id", protect, getCinemaById);

router.post("/", protect, adminOnly, createCinema);
router.put("/:id", protect, adminOnly, updateCinema);
router.delete("/:id", protect, adminOnly, deleteCinema);

module.exports = router;
