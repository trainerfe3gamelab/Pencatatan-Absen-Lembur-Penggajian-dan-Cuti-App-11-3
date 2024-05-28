const bcrypt = require("bcrypt");

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
        defaultValue:
          "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png",
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
    },
    {
      tableName: "tbl_users",
      timestamps: true,
      createdAt: "creation_time",
      updatedAt: "update_time",
    }
  );

  User.associate = function (models) {
    User.belongsTo(models.Position, { foreignKey: "position_id" });
    User.hasMany(models.Attendance, { foreignKey: "user_id" });
    User.hasMany(models.Leave, { foreignKey: "user_id" });
    User.hasMany(models.Overtime, { foreignKey: "user_id" });
    User.hasMany(models.Wage, { foreignKey: "user_id" });
    User.hasMany(models.EmailVerification, { foreignKey: "email" });
  };

  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  return User;
};
