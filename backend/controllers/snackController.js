const Snack = require("../models/snack.model");

// @desc    Get all Snack
// @route   Get /api/snacks/
// @access  Public
const getSnacks = async (req, res) => {
  try {
    const snacks = await Snack.findAll();
    res.json(snacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get snack by ID
// @route   Get /api/snacks/:id
// @access  Public
const getSnackById = async (req, res) => {
  try {
    const snack = await Snack.findByPk(req.params.id);
    if (!snack) return res.status(404).json({ message: "Snack not found" });
    res.json(snack);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create snack
// @route   POST /api/snacks/
// @access  Private
const createSnack = async (req, res) => {
  try {
    const { name, price, description, image_url } = req.body;
    const snack = await Snack.create({ name, price, description, image_url });
    res.status(201).json({ message: "Snack created successfully!", snack });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update snack by ID
// @route   PUT /api/snacks/:id
// @access  Private
const updateSnack = async (req, res) => {
  try {
    const snack = await Snack.findByPk(req.params.id);
    if (!snack) return res.status(404).json({ message: "Snack not found" });
    snack.name = req.body.name || snack.name;
    snack.price = req.body.price || snack.price;
    snack.description = req.body.description || snack.description;
    snack.image_url = req.body.image_url || snack.image_url;
    const updatedSnack = await snack.save();
    res.json({ message: "Snack updated successfully!", updatedSnack });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete snack by ID
// @route   DELETE /api/snacks/:id
// @access  Private
const deleteSnack = async (req, res) => {
  try {
    const snack = await Snack.findByPk(req.params.id);
    if (!snack) return res.status(404).json({ message: "Snack not found" });
    await snack.destroy();
    res.json({ message: "Snack deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getSnacks,
  getSnackById,
  updateSnack,
  createSnack,
  deleteSnack,
};
