const mongoose = require("mongoose");
const Room = new mongoose.Schema(
  {
    cinema_id: { type: Number, required: true },
    name: { type: String, required: true },
    seat_map: [
      {
        x: Number,
        y: Number,
        seat_code: String,
        seat_type: String,
        is_available: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", Room);
