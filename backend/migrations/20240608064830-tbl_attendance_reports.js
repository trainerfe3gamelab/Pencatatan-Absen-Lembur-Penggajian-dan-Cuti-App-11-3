"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_attendance_reports", {
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
      hadir: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sakit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      izin: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      alpha: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      archived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      creation_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      update_time: {
        allowNull: false,
        type: Sequelize.DATE,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_wages");
  },
};
