module.exports = (sequelize, DataTypes) => {
  const Overtime = sequelize.define(
    "Overtime",
    {
      id: {
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
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time_in: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      time_out: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      creation_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      update_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      tableName: "tbl_overtimes",
      timestamps: true,
      createdAt: "creation_time",
      updatedAt: "update_time",
    }
  );

  Overtime.associate = function (models) {
    Overtime.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Overtime;
};
