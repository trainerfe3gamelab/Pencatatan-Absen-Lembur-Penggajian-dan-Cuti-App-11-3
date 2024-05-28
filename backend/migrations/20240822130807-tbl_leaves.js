"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_leaves", {
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
      type: {
        type: Sequelize.UUID,
        references: { model: "tbl_salary_cuts", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      reasoning: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("tbl_leaves");
  },
};
