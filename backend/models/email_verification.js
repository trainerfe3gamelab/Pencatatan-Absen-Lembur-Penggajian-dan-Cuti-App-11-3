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
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      update_time: {
        type: DataTypes.DATE,
        allowNull: true,
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
      timestamps: true,
      createdAt: "creation_time",
      updatedAt: "update_time",
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
