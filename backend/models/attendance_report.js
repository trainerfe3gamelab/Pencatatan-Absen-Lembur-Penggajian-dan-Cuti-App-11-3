module.exports = (sequelize, DataTypes) => {
  const AttendanceReport = sequelize.define(
    "AttendanceReport",
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
      hadir: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sakit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      izin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      alpha: {
        type: DataTypes.INTEGER,
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
      tableName: "tbl_attendance_reports",
      timestamps: false,
    }
  );

  AttendanceReport.associate = function (models) {
    AttendanceReport.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return AttendanceReport;
};
