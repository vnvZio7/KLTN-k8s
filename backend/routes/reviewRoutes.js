import express from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  createReview,
  deleteReview,
  getReviewById,
  getReviews,
  updateReview,
} from "../controllers/reviewController";

const router = express.Router();

// Review Management Routes
router.get("/", protect, getReviews);
router.get("/:id", protect, getReviewById);

router.post("/", protect, createReview);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

module.exports = router;
