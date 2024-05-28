"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_wages", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        references: { model: "tbl_users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 12,
        },
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1900, // adjust as needed
          max: 2100, // adjust as needed
        },
      },
      overtimes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      time_off: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      archived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      create_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      creation_time: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      update_time: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      update_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_wages");
  },
};
