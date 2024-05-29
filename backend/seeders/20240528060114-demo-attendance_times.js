"use strict";
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("tbl_attendance_times", [
      {
        id: "a",
        name: "waktu masuk",
        start_time: "08:00:00",
        end_time: "08:30:00",
        creation_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
        update_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
        create_id: uuidv4(),
        update_id: uuidv4(),
      },
      {
        id: "b",
        name: "waktu keluar",
        start_time: "16:00:00",
        end_time: "16:30:00",
        creation_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
        update_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
        create_id: uuidv4(),
        update_id: uuidv4(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("tbl_attendance_times", null, {});
  },
};
