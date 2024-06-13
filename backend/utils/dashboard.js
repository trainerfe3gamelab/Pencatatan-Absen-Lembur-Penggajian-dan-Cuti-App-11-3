const { User, Position, Attendance, sequelize } = require("../models");
const { fn, literal } = sequelize;

const getData = async () => {
  try {
    const users = await User.findAll({
      where: { archived: false },
      attributes: [
        [
          fn("SUM", literal(`CASE WHEN role = 'employee' THEN 1 ELSE 0 END`)),
          "employees",
        ],
        [
          fn("SUM", literal(`CASE WHEN role = 'admin' THEN 1 ELSE 0 END`)),
          "admins",
        ],
      ],
    });

    const positions = await Position.count({ where: { archived: false } });
    const attendances = await Attendance.count({ where: { archived: false } });
    const data = {
      ...users[0].dataValues,
      positions,
      attendances,
    };

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

module.exports = {
  getData,
};
