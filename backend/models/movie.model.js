const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Movie = sequelize.define(
  "Movie",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    adult: DataTypes.BOOLEAN,
    language: DataTypes.STRING,
    release_date: DataTypes.DATE,
    backdrop_path: DataTypes.STRING,
    trailer_url: DataTypes.STRING,
    vote_average: DataTypes.FLOAT,
    vote_count: DataTypes.INTEGER,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "movies",
    timestamps: false,
  }
);

module.exports = Movie;
