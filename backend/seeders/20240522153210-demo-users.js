"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

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
        profile_picture: "img/default-profile-picture.png",
        position_id: "tes",
        creation_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
        update_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
        create_id: uuidv4(),
        update_id: uuidv4(),
      },
      {
        id: "tes1",
        email: "user1@example.com",
        password: hashedPassword,
        role: "employee",
        name: "Toni",
        address: "123 Main St",
        phone_number: "12345678",
        profile_picture: "img/default-profile-picture.png",
        position_id: "tes1",
        creation_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
        update_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
        create_id: uuidv4(),
        update_id: uuidv4(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("tbl_users", null, {});
  },
};
