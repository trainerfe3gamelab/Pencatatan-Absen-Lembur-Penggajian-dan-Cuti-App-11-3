"use strict";

const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("tbl_salary_cuts", [
      {
        id: "tes2",
        type: "alpha",
        cut: 100000,
        creation_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
        update_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
        create_id: uuidv4(),
        update_id: uuidv4(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("tbl_positions", null, {});
  },
};
