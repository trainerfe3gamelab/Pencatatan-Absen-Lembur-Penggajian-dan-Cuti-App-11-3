"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_time", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      time_in: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      time_off: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      archived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      creation_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      create_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      update_time: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      update_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_email_verifications");
  },
};
