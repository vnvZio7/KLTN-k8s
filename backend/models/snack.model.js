const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Snack = sequelize.define(
  "Snack",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    image_url: DataTypes.STRING,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "snacks",
    timestamps: false,
  }
);

module.exports = Snack;
