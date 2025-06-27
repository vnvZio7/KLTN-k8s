const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// @desc    Get all users (Admin only)
// @route   Get /api/users/
// @access  Private (Admin)
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: "USER" },
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get user by ID
// @route   Get /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getUsers, getUserById };
