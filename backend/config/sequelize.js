const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Tcinema", "root", "root", {
  host: "mysql",
  dialect: "mysql",
  logging: false, // tắt log query
});

module.exports = sequelize;
