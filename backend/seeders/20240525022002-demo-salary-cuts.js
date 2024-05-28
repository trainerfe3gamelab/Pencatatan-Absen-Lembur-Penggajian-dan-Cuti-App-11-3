"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("tbl_salary_cuts", [
      {
        id: "tes",
        type: "izin",
        cut: 100000,
        create_id: "1",
      },
      {
        id: "tes1",
        type: "sakit",
        cut: 1000,
        create_id: "1",
      },
      {
        id: "tes2",
        type: "alpha",
        cut: 100000,
        create_id: "1",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("tbl_positions", null, {});
  },
};
