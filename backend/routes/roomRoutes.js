import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware";
import {
  createRoom,
  deleteRoom,
  getRoomById,
  getRooms,
  updateRoom,
} from "../controllers/roomController";

const router = express.Router();

// Room Management Routes
router.get("/", protect, getRooms);
router.get("/:id", protect, getRoomById);

router.post("/", protect, adminOnly, createRoom);
router.put("/:id", protect, adminOnly, updateRoom);
router.delete("/:id", protect, adminOnly, deleteRoom);

module.exports = router;
