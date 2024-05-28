module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "Attendance",
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: "User", key: "id" },
      },
      date: DataTypes.DATEONLY,
      time_in: DataTypes.TIME,
      photo_proof: DataTypes.STRING,
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
