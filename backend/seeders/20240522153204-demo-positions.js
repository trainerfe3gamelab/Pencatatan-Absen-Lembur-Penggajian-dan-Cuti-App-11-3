"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("tbl_positions", [
      {
        id: "tes",
        position_name: "Software Developer",
        description:
          "Develops information systems by designing, developing, and installing software solutions.",
        base_salary: 6000000,
        transport_allowance: 300000,
        meal_allowance: 250000,
      },
      {
        id: "tes1",
        position_name: "Product Manager",
        description: "Oversees the development and delivery of products.",
        base_salary: 70000000,
        transport_allowance: 300000,
        meal_allowance: 250000,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("tbl_positions", null, {});
  },
};
