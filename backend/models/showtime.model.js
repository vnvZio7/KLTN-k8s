const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Showtime = sequelize.define(
  "Showtime",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    movie_id: DataTypes.INTEGER,
    room_id: DataTypes.STRING, // MongoDB ObjectId
    show_date: DataTypes.DATEONLY,
    start_time: DataTypes.TIME,
    price: DataTypes.FLOAT,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "showtimes",
    timestamps: false,
  }
);

module.exports = Showtime;
