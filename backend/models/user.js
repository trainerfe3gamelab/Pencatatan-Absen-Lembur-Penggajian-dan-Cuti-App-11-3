const { hash } = require("../utils/bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("employee", "admin"),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("laki-laki", "perempuan"),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "img/default-profile-picture.png",
      },
      position_id: {
        type: DataTypes.UUID,
        references: {
          model: "Position",
          key: "id",
        },
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
      tableName: "tbl_users",
      timestamps: false,
    }
  );

  User.associate = function (models) {
    User.belongsTo(models.Position, {
      foreignKey: "position_id",
      as: "position",
    });
    User.hasMany(models.Attendance, {
      foreignKey: "user_id",
      as: "attendances",
    });
    User.hasMany(models.Leave, { foreignKey: "user_id", as: "leaves" });
    User.hasMany(models.Overtime, { foreignKey: "user_id", as: "overtimes" });
    User.hasMany(models.Wage, { foreignKey: "user_id", as: "wages" });
    User.hasMany(models.AttendanceReport, {
      foreignKey: "user_id",
      as: "attendance_reports",
    });
    User.hasMany(models.EmailVerification, {
      foreignKey: "email",
      as: "emailverifications",
    });
  };

  User.beforeCreate(async (user, options) => {
    user.password = await hash(user.password);
  });

  User.beforeUpdate(async (user, options) => {
    if (user.changed("password")) {
      user.password = await hash(user.password);
    }
  });

  return User;
};
