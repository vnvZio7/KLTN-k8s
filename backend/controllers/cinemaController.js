const Cinema = require("../models/cinema.model");

// @desc    Get all Cinema
// @route   Get /api/cinemas/
// @access  Public
const getCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.findAll();
    res.json(cinemas);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get cinema by ID
// @route   Get /api/cinemas/:id
// @access  Public
const getCinemaById = async (req, res) => {
  try {
    const cinema = await Cinema.findByPk(req.params.id);
    if (!cinema) return res.status(404).json({ message: "Cinema not found" });
    res.json(cinema);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create cinema
// @route   POST /api/cinemas/
// @access  Private
const createCinema = async (req, res) => {
  try {
    const { name, address } = req.body;
    const cinema = await Cinema.create({ name, address });
    res.status(201).json({ message: "Cinema created successfully!", cinema });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update cinema by ID
// @route   PUT /api/cinemas/:id
// @access  Private
const updateCinema = async (req, res) => {
  try {
    const cinema = await Cinema.findByPk(req.params.id);
    if (!cinema) return res.status(404).json({ message: "Cinema not found" });
    cinema.name = req.body.name || cinema.name;
    cinema.address = req.body.address || cinema.address;
    const updatedCinema = await cinema.save();
    res.json({ message: "Cinema updated successfully!", updatedCinema });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete cinema by ID
// @route   DELETE /api/cinemas/:id
// @access  Private
const deleteCinema = async (req, res) => {
  try {
    const cinema = await Cinema.findByPk(req.params.id);
    if (!cinema) return res.status(404).json({ message: "Cinema not found" });
    await cinema.destroy();
    res.json({ message: "Cinema deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getCinemas,
  getCinemaById,
  updateCinema,
  createCinema,
  deleteCinema,
};
