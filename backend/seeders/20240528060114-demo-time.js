"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("tbl_time", [
      {
        id: "tes",
        time_in: "08:00:00",
        time_off: "15:00:00",
        create_id: "1",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("tbl_users", null, {});
  },
};
