"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("tbl_attendance_times", [
      {
        id: "a",
        name: "waktu masuk",
        start_time: "08:00:00",
        end_time: "08:30:00",
      },
      {
        id: "b",
        name: "waktu keluar",
        start_time: "16:00:00",
        end_time: "16:30:00",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("tbl_users", null, {});
  },
};
