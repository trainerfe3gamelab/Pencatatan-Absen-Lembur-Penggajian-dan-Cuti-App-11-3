module.exports = (sequelize, DataTypes) => {
  const Wage = sequelize.define(
    "Wage",
    {
      uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "id",
        },
        allowNull: false,
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 12,
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1900,
          max: 2100,
        },
      },
      overtimes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time_off: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      creation_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      create_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      update_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      update_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      tableName: "tbl_wages",
      timestamps: true,
      createdAt: "creation_time",
      updatedAt: "update_time",
    }
  );

  Wage.associate = function (models) {
    Wage.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Wage;
};
