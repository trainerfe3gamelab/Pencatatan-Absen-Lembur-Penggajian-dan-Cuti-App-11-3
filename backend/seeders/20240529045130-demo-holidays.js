"use strict";
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("tbl_holidays", [
      {
        id: "a",
        name: "hari raya libur adha",
        start_date: "2024-05-29",
        end_date: "2024-06-02",
        creation_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
        update_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
        create_id: uuidv4(),
        update_id: uuidv4(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("tbl_holidays", null, {});
  },
};
