"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("password123", 10); // Hashing password

    return queryInterface.bulkInsert("tbl_users", [
      {
        id: "tes",
        email: "user@example.com",
        password: hashedPassword,
        role: "admin",
        name: "John Doe",
        address: "123 Main St",
        phone_number: "1234567890",
        profile_picture:
          "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png",
        position_id: "tes",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("tbl_users", null, {});
  },
};
