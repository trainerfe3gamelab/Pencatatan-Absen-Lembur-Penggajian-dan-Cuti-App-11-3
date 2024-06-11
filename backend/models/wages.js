module.exports = (sequelize, DataTypes) => {
  const Wage = sequelize.define(
    "Wage",
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
      overtimes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cuts: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      net_salary: {
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
      tableName: "tbl_wages",
      timestamps: false,
    }
  );

  Wage.associate = function (models) {
    Wage.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return Wage;
};
