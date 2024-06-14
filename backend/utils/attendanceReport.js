const { User, Leave, Attendance, Holiday } = require("../models");
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

const calculateAlpha = (
  days,
  weekends,
  holidays,
  totalPresence,
  totalLeave
) => {
  return Math.max(0, days - weekends - holidays - totalPresence - totalLeave);
};

const createAttendanceReports = async (userId, targetDate) => {
  const targetMoment = moment(targetDate).tz("Asia/Jakarta");
  const targetMonth = targetMoment.month() + 1; // months are 0-based
  const targetYear = targetMoment.year();

  const daysInMonth = targetMoment.daysInMonth();
  const weekends = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(targetYear, targetMonth - 1, i + 1)
  ).filter((date) => date.getDay() === 0 || date.getDay() === 6).length;

  // Get holidays from the database
  const holidays = await getHolidaysForMonth(targetYear, targetMonth);

  const user = await User.findOne({
    where: { id: userId, archived: false, role: "employee" },
    attributes: data.attributes,
    include: data.include(targetMoment, targetMonth, targetYear),
    group: ["User.id"],
  });

  if (!user) return null;

  const hadir = parseInt(user.getDataValue("hadir")) || 0;
  const sakit = parseInt(user.getDataValue("sakit")) || 0;
  const izin = parseInt(user.getDataValue("izin")) || 0;
  const totalPresence = hadir;
  const totalLeave = sakit + izin;

  const alpha = calculateAlpha(
    daysInMonth,
    weekends,
    holidays,
    totalPresence,
    totalLeave
  );

  return {
    user_id: user.id,
    alpha,
    hadir,
    sakit,
    izin,
  };
};

const createAttendanceReportsForAllUsers = async (targetDate) => {
  const targetMoment = moment(targetDate).tz("Asia/Jakarta");
  const targetMonth = targetMoment.month() + 1; // months are 0-based
  const targetYear = targetMoment.year();

  const daysInMonth = targetMoment.daysInMonth();
  const weekends = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(targetYear, targetMonth - 1, i + 1)
  ).filter((date) => date.getDay() === 0 || date.getDay() === 6).length;

  // Get holidays from the database
  const holidays = await getHolidaysForMonth(targetYear, targetMonth);

  const users = await User.findAll({
    where: { archived: false, role: "employee" },
    attributes: data.attributes,
    include: data.include(targetMoment, targetMonth, targetYear),
    group: ["User.id"],
  });

  const reports = users.map((user) => {
    const hadir = parseInt(user.getDataValue("hadir")) || 0;
    const sakit = parseInt(user.getDataValue("sakit")) || 0;
    const izin = parseInt(user.getDataValue("izin")) || 0;
    const totalPresence = hadir;
    const totalLeave = sakit + izin;

    const alpha = calculateAlpha(
      daysInMonth,
      weekends,
      holidays,
      totalPresence,
      totalLeave
    );

    return {
      user_id: user.id,
      alpha,
      hadir,
      sakit,
      izin,
    };
  });

  return reports;
};

const getHolidaysForMonth = async (year, month) => {
  const startDate = moment(`${year}-${month}-01`).startOf("month").toDate();
  const endDate = moment(startDate).endOf("month").toDate();
  const holidays = await Holiday.findAll({
    where: {
      archived: false,
      [Op.or]: [
        { start_date: { [Op.between]: [startDate, endDate] } },
        { end_date: { [Op.between]: [startDate, endDate] } },
        {
          [Op.and]: [
            { start_date: { [Op.lte]: startDate } },
            { end_date: { [Op.gte]: endDate } },
          ],
        },
      ],
    },
  });

  return holidays.reduce((total, holiday) => {
    const holidayStart = moment.max(
      moment(holiday.start_date),
      moment(startDate)
    );
    const holidayEnd = moment.min(moment(holiday.end_date), moment(endDate));
    return total + holidayEnd.diff(holidayStart, "days") + 1;
  }, 0);
};

module.exports = {
  createAttendanceReports,
  createAttendanceReportsForAllUsers,
};
