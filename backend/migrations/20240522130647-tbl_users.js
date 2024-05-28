"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tbl_users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM,
        values: ["employee", "admin"],
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["laki-laki", "perempuan"],
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profile_picture: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:
          "'https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png'",
      },
      position_id: {
        type: Sequelize.UUID,
        references: {
          model: "tbl_positions", // Ensure this matches the updated table name for positions
          key: "id",
        },
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tbl_users");
  },
};
