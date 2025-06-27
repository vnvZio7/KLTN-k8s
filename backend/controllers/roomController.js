const Room = require("../models/room.model");

// @desc    Get all Room
// @route   Get /api/rooms/
// @access  Public
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get room by ID
// @route   Get /api/rooms/:id
// @access  Public
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create room
// @route   POST /api/rooms/
// @access  Private
const createRoom = async (req, res) => {
  try {
    const { cinema_id, name, seat_map } = req.body;
    const room = await Room.create({
      cinema_id,
      name,
      seat_map,
    });
    res.status(201).json({ message: "Room created successfully!", room });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update room by ID
// @route   PUT /api/rooms/:id
// @access  Private
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    room.cinema_id = req.body.cinema_id || room.cinema_id;
    room.name = req.body.name || room.name;
    room.seat_map = req.body.seat_map || room.seat_map;
    const updatedRoom = await room.save();
    res.json({ message: "Room updated successfully!", updatedRoom });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete room by ID
// @route   DELETE /api/rooms/:id
// @access  Private
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    await room.deleteOne();
    res.json({ message: "Room deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getRooms,
  getRoomById,
  updateRoom,
  createRoom,
  deleteRoom,
};
