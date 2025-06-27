const Showtime = require("../models/showtime.model");

// @desc    Get all Showtime
// @route   Get /api/showtimes/
// @access  Public
const getShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.findAll();
    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get showtime by ID
// @route   Get /api/showtimes/:id
// @access  Public
const getShowtimeById = async (req, res) => {
  try {
    const showtime = await Showtime.findByPk(req.params.id);
    if (!showtime)
      return res.status(404).json({ message: "Showtime not found" });
    res.json(showtime);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create showtime
// @route   POST /api/showtimes/
// @access  Public
const createShowtime = async (req, res) => {
  try {
    const { movie_id, room_id, show_date, start_time, price } = req.body;
    const showtime = await Showtime.create({
      movie_id,
      room_id,
      show_date,
      start_time,
      price,
    });
    res
      .status(201)
      .json({ message: "Showtime created successfully!", showtime });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update showtime by ID
// @route   PUT /api/showtimes/:id
// @access  Public
const updateShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByPk(req.params.id);
    if (!showtime)
      return res.status(404).json({ message: "Showtime not found" });
    showtime.movie_id = req.body.movie_id || showtime.movie_id;
    showtime.room_id = req.body.room_id || showtime.room_id;
    showtime.show_date = req.body.show_date || showtime.show_date;
    showtime.start_time = req.body.start_time || showtime.start_time;
    showtime.price = req.body.price || showtime.price;
    const updatedShowtime = await showtime.save();
    res.json({ message: "Showtime updated successfully!", updatedShowtime });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete showtime by ID
// @route   DELETE /api/showtimes/:id
// @access  Public
const deleteShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByPk(req.params.id);
    if (!showtime)
      return res.status(404).json({ message: "Showtime not found" });
    await showtime.destroy();
    res.json({ message: "Showtime deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getShowtimes,
  getShowtimeById,
  updateShowtime,
  createShowtime,
  deleteShowtime,
};
