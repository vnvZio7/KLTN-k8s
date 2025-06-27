import express from "express";
import { adminOnly, protect } from "..//middlewares/authMiddleware";
import {
  createSnack,
  deleteSnack,
  getSnackById,
  getSnacks,
  updateSnack,
} from "../controllers/snackController";

const router = express.Router();

// Snack Management Routes
router.get("/", protect, getSnacks);
router.get("/:id", protect, getSnackById);

router.post("/", protect, adminOnly, createSnack);
router.put("/:id", protect, adminOnly, updateSnack);
router.delete("/:id", protect, adminOnly, deleteSnack);

module.exports = router;
