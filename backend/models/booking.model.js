const mongoose = require("mongoose");
const Booking = new mongoose.Schema(
  {
    user_id: { type: Number, required: true },
    showtime_id: { type: Number, required: true },
    total_price: { type: Number, required: true },
    booking_seats: [
      {
        seat_code: String,
      },
    ],
    booking_snacks: [
      {
        name: String,
        quantity: Number,
        price: Number,
        image_url: String,
      },
    ],
    payment_time: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", Booking);
