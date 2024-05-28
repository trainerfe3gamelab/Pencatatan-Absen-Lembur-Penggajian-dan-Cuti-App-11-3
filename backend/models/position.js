module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define(
    "Position",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      position_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      base_salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transport_allowance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      meal_allowance: {
        type: DataTypes.INTEGER,
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
      update_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "tbl_positions",
      timestamps: true,
      createdAt: "creation_time",
      updatedAt: "update_time",
    }
  );

  Position.associate = function (models) {
    Position.hasMany(models.User, { foreignKey: "position_id" });
  };

  return Position;
};
