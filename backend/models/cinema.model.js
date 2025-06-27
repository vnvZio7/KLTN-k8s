const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Cinema = sequelize.define(
  "Cinema",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "cinemas",
    timestamps: false,
  }
);

module.exports = Cinema;
