"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tbl_positions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      position_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      base_salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      transport_allowance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      meal_allowance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      archived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      creation_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      update_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      create_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      update_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tbl_positions");
  },
};
