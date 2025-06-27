const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Genre = sequelize.define(
  "Genre",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "genres",
    timestamps: false,
  }
);

module.exports = Genre;
