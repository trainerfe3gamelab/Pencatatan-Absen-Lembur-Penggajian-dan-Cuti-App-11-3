"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("tbl_salary_cuts", [
      {
        id: "tes2",
        type: "alpha",
        cut: 100000,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("tbl_positions", null, {});
  },
};
