module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define(
    "Leave",
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
      type: {
        type: DataTypes.UUID,
        references: {
          model: "SalaryCut",
          key: "id",
        },
        allowNull: false,
      },
      reasoning: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
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
      tableName: "tbl_leaves",
      timestamps: true,
      createdAt: "creation_time",
      updatedAt: "update_time",
    }
  );

  Leave.associate = function (models) {
    Leave.belongsTo(models.User, { foreignKey: "user_id" });
    Leave.belongsTo(models.SalaryCut, { foreignKey: "type" });
  };

  return Leave;
};
