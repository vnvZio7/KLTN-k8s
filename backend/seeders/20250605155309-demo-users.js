"use strict";
// const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    // const passwordHash = await bcrypt.hash("123456", 10);
    return queryInterface.bulkInsert("users", [
      {
        name: "Admin User",
        email: "admin@example.com",
        password_hash: "123456",
        role: "ADMIN",
        created_at: new Date(),
      },
      {
        name: "Normal User",
        email: "user@example.com",
        password_hash: "123456",
        role: "USER",
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", {
      email: { [Sequelize.Op.in]: ["admin@example.com", "user@example.com"] },
    });
  },
};
