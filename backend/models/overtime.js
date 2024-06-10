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
      status: {
        type: DataTypes.ENUM("diproses", "disetujui", "ditolak"),
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
      update_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      create_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "tbl_overtimes",
      timestamps: false,
    }
  );

  Overtime.associate = function (models) {
    Overtime.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return Overtime;
};
