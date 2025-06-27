"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash("123456", 10);
    return await queryInterface.bulkInsert("users", [
      {
        id: 1,
        fullname: "Admin User",
        email: "admin@gmail.com",
        password_hash: `${passwordHash}`,
        role: "ADMIN",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        fullname: "Normal User",
        email: "user@gmail.com",
        password_hash: `${passwordHash}`,
        role: "USER",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("users", {
      email: { [Sequelize.Op.in]: ["admin@gmail.com", "user@gmail.com"] },
    });
  },
};
