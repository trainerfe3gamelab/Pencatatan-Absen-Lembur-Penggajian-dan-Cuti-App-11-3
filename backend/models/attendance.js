module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "Attendance",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        references: { model: "User", key: "id" },
        allowNull: false,
      },
      date: DataTypes.DATEONLY,
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time_in: DataTypes.TIME,
      time_out: DataTypes.TIME,
      archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      creation_time: DataTypes.DATE,
      create_id: DataTypes.INTEGER,
      update_time: DataTypes.DATE,
      update_id: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      createdAt: "creation_time",
      updatedAt: "update_time",
      tableName: "tbl_attendances",
    }
  );

  Attendance.associate = function (models) {
    // associations can be defined here
    Attendance.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Attendance;
};
