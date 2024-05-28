module.exports = (sequelize, DataTypes) => {
  const EmailVerification = sequelize.define(
    "EmailVerification",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "User",
          key: "email",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expired: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      tableName: "tbl_email_verifications",
      timestamps: false,
    }
  );

  EmailVerification.associate = function (models) {
    EmailVerification.belongsTo(models.User, {
      foreignKey: "email",
      targetKey: "email",
    });
  };

  return EmailVerification;
};
