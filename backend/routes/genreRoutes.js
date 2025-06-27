import express from "express";
import { adminOnly, protect } from "..//middlewares/authMiddleware";
import {
  getGenres,
  getGenreById,
  updateGenre,
  createGenre,
  deleteGenre,
} from "../controllers/genreController";

const router = express.Router();

// Genre Management Routes
router.get("/", protect, getGenres);
router.get("/:id", protect, getGenreById);

router.post("/", protect, adminOnly, createGenre);
router.put("/:id", protect, adminOnly, updateGenre);
router.delete("/:id", protect, adminOnly, deleteGenre);

module.exports = router;
