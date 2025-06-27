const Review = require("../models/review.model");

// @desc    Get all Review
// @route   Get /api/reviews/
// @access  Public
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get review by ID
// @route   Get /api/reviews/:id
// @access  Public
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create review
// @route   POST /api/reviews/
// @access  Public
const createReview = async (req, res) => {
  try {
    const { movie_id, user_id, content, star } = req.body;
    const review = await Review.create({ movie_id, user_id, content, star });
    res.status(201).json({ message: "Review created successfully!", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update review by ID
// @route   PUT /api/reviews/:id
// @access  Public
const updateReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    review.movie_id = req.body.movie_id || review.movie_id;
    review.user_id = req.body.user_id || review.user_id;
    review.content = req.body.content || review.content;
    review.star = req.body.star || review.star;
    const updatedReview = await review.save();
    res.json({ message: "Review updated successfully!", updatedReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete review by ID
// @route   DELETE /api/reviews/:id
// @access  Public
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    await review.destroy();
    res.json({ message: "Review deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getReviews,
  getReviewById,
  updateReview,
  createReview,
  deleteReview,
};
