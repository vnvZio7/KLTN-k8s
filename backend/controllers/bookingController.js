const Booking = require("../models/booking.model");

// @desc    Get all Booking
// @route   Get /api/bookings/
// @access  Public
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get booking by ID
// @route   Get /api/bookings/:id
// @access  Public
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create booking
// @route   POST /api/bookings/
// @access  Private
const createBooking = async (req, res) => {
  try {
    const {
      user_id,
      showtime_id,
      total_price,
      booking_seats,
      booking_snacks,
      payment_time,
    } = req.body;
    const booking = await Booking.create({
      user_id,
      showtime_id,
      total_price,
      booking_seats,
      booking_snacks,
      payment_time,
    });
    res.status(201).json({ message: "Booking created successfully!", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update booking by ID
// @route   PUT /api/bookings/:id
// @access  Private
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    booking.user_id = req.body.user_id || booking.user_id;
    booking.showtime_id = req.body.showtime_id || booking.showtime_id;
    booking.total_price = req.body.total_price || booking.total_price;
    booking.booking_seats = req.body.booking_seats || booking.booking_seats;
    booking.booking_snacks = req.body.booking_snacks || booking.booking_snacks;
    booking.payment_time = req.body.payment_time || booking.payment_time;
    const updatedBooking = await booking.save();
    res.json({ message: "Booking updated successfully!", updatedBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete booking by ID
// @route   DELETE /api/bookings/:id
// @access  Private
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    await booking.deleteOne();
    res.json({ message: "Booking deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getBookings,
  getBookingById,
  updateBooking,
  createBooking,
  deleteBooking,
};
