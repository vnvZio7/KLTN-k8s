const Genre = require("../models/genre.model");

// @desc    Get all Genres (Admin only)
// @route   Get /api/genres/
// @access  Private (Admin)
const getGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get genre by ID
// @route   Get /api/genres/:id
// @access  Private
const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    res.json(genre);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create genre
// @route   POST /api/genres/
// @access  Private
const createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await Genre.create({ name });
    res.status(201).json({ message: "Genre created successfully!", genre });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update genre by ID
// @route   PUT /api/genres/:id
// @access  Private
const updateGenre = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    genre.name = req.body.name || genre.name;
    const updatedGenre = await genre.save();
    res.json({ message: "Genre updated successfully!", updatedGenre });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete genre by ID
// @route   DELETE /api/genres/:id
// @access  Private
const deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    await genre.destroy();
    res.json({ message: "Genre deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getGenres,
  getGenreById,
  updateGenre,
  createGenre,
  deleteGenre,
};
