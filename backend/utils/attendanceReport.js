const { User, Leave, Attendance } = require("../models");
const { Op, fn, col, literal } = require("sequelize");
const moment = require("moment-timezone");

const data = {
  attributes: [
    "id",
    [
      fn(
        "SUM",
        literal(`CASE WHEN attendances.status = 'alpha' THEN 1 ELSE 0 END`)
      ),
      "alpha",
    ],
    [
      fn(
        "SUM",
        literal(
          `CASE WHEN attendances.status = 'telat' OR attendances.status = 'hadir' THEN 1 ELSE 0 END`
        )
      ),
      "hadir",
    ],
    [
      fn(
        "SUM",
        literal(
          `CASE WHEN leaves.type = 'sakit' AND leaves.status = 'disetujui' THEN DATEDIFF(leaves.end_date, leaves.start_date) + 1 ELSE 0 END`
        )
      ),
      "sakit",
    ],
    [
      fn(
        "SUM",
        literal(
          `CASE WHEN leaves.type = 'izin' AND leaves.status = 'disetujui' THEN DATEDIFF(leaves.end_date, leaves.start_date) + 1 ELSE 0 END`
        )
      ),
      "izin",
    ],
  ],
  include: (targetMoment, targetMonth, targetYear) => {
    return [
      {
        model: Attendance,
        as: "attendances",
        attributes: [],
        where: {
          archived: false,
          [Op.and]: [
            fn("MONTH", col("attendances.date")),
            targetMonth,
            fn("YEAR", col("attendances.date")),
            targetYear,
          ],
        },
        required: false,
      },
      {
        model: Leave,
        as: "leaves",
        attributes: [],
        where: {
          archived: false,
          status: "disetujui",
          [Op.or]: [
            {
              start_date: {
                [Op.lte]: targetMoment.endOf("month").toDate(),
              },
            },
            {
              end_date: {
                [Op.gte]: targetMoment.startOf("month").toDate(),
              },
            },
          ],
        },
        required: false,
      },
    ];
  },
};

const createAttendanceReports = async (userId, targetDate) => {
  const targetMoment = moment(targetDate).tz("Asia/Jakarta");
  const targetMonth = targetMoment.month() + 1; // months are 0-based
  const targetYear = targetMoment.year();

  const user = await User.findOne({
    where: { id: userId, archived: false, role: "employee" },
    attributes: data.attributes,
    include: data.include(targetMoment, targetMonth, targetYear),
    group: ["User.id"],
  });

  if (!user) return null;

  return {
    user_id: user.id,
    alpha: parseInt(user.getDataValue("alpha")) || 0,
    hadir: parseInt(user.getDataValue("hadir")) || 0,
    sakit: parseInt(user.getDataValue("sakit")) || 0,
    izin: parseInt(user.getDataValue("izin")) || 0,
  };
};

const createAttendanceReportsForAllUsers = async (targetDate) => {
  const targetMoment = moment(targetDate).tz("Asia/Jakarta");
  const targetMonth = targetMoment.month() + 1; // months are 0-based
  const targetYear = targetMoment.year();

  const users = await User.findAll({
    where: { archived: false, role: "employee" },
    attributes: data.attributes,
    include: data.include(targetMoment, targetMonth, targetYear),
    group: ["User.id"],
  });

  const reports = users.map((user) => ({
    user_id: user.id,
    alpha: parseInt(user.getDataValue("alpha")) || 0,
    hadir: parseInt(user.getDataValue("hadir")) || 0,
    sakit: parseInt(user.getDataValue("sakit")) || 0,
    izin: parseInt(user.getDataValue("izin")) || 0,
  }));

  return reports;
};
module.exports = {
  createAttendanceReports,
  createAttendanceReportsForAllUsers,
};
