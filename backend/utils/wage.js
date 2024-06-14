const {
  User,
  Position,
  Overtime,
  Leave,
  Attendance,
  SalaryCut,
  Holiday,
} = require("../models");
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
      "totalAlpha",
    ],
    [
      fn(
        "SUM",
        literal(
          `CASE WHEN attendances.status = 'telat' OR attendances.status = 'hadir' THEN 1 ELSE 0 END`
        )
      ),
      "totalPresence",
    ],
    [
      fn(
        "COUNT",
        literal(
          `CASE WHEN overtimes.status = 'disetujui' THEN overtimes.id ELSE NULL END`
        )
      ),
      "totalOvertime",
    ],
    [
      fn(
        "SUM",
        literal("TIMESTAMPDIFF(HOUR, overtimes.time_in, overtimes.time_out) ")
      ),
      "totalOvertimeHours",
    ],
    [
      fn(
        "SUM",
        literal(
          `CASE WHEN leaves.status = 'disetujui' THEN DATEDIFF(leaves.end_date, leaves.start_date) + 1 ELSE 0 END`
        )
      ),
      "totalLeaveDays",
    ],
  ],
  include: (targetMonth, targetYear, targetStartDate, targetEndDate) => {
    return [
      {
        model: Position,
        as: "position",
        attributes: ["base_salary", "transport_allowance", "meal_allowance"],
      },
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
        model: Overtime,
        as: "overtimes",
        attributes: [],
        where: {
          archived: false,
          status: "disetujui",
          [Op.and]: [
            fn("MONTH", col("overtimes.date")),
            targetMonth,
            fn("YEAR", col("overtimes.date")),
            targetYear,
          ],
        },
        required: false,
      },
      {
        model: Leave,
        as: "leaves",
        attributes: ["id", "type", "start_date", "end_date"],
        where: {
          archived: false,
          status: "disetujui",
          [Op.and]: [
            {
              start_date: {
                [Op.lte]: targetEndDate.toDate(),
              },
            },
            {
              end_date: {
                [Op.gte]: targetStartDate.toDate(),
              },
            },
          ],
        },
        required: false,
      },
    ];
  },
};

const createWageReportsForAllUsers = async (targetMonth, targetYear) => {
  const targetStartDate = moment([targetYear, targetMonth - 1, 1]);
  const targetEndDate = moment(targetStartDate).endOf("month");

  const users = await User.findAll({
    where: { archived: false, role: "employee" },
    attributes: data.attributes,
    include: data.include(
      targetMonth,
      targetYear,
      targetStartDate,
      targetEndDate
    ),
    group: [
      "User.id",
      "position.id",
      "position.base_salary",
      "position.transport_allowance",
      "position.meal_allowance",
      "leaves.id",
      "leaves.type",
      "leaves.start_date",
      "leaves.end_date",
    ],
  });

  const salaryCuts = await getSalaryCuts();
  const holidays = await getTotalHoliday(targetYear, targetMonth);

  const reports = users.map((user) => {
    const totalLeaveDays = user.leaves.reduce((total, leave) => {
      const leaveStartDate = moment(leave.start_date);
      const leaveEndDate = moment(leave.end_date);

      const effectiveStartDate = leaveStartDate.isBefore(targetStartDate)
        ? targetStartDate
        : leaveStartDate;
      const effectiveEndDate = leaveEndDate.isAfter(targetEndDate)
        ? targetEndDate
        : leaveEndDate;

      const leaveDays = effectiveEndDate.diff(effectiveStartDate, "days") + 1;

      return (
        total +
        (leaveStartDate.isBefore(targetEndDate) &&
        leaveEndDate.isAfter(targetStartDate)
          ? leaveDays
          : 0)
      );
    }, 0);

    const overtimePay = calculateOvertimePay(
      user.getDataValue("totalOvertimeHours"),
      user.position.base_salary
    );

    const totalCut = calculateCut(
      targetMonth,
      targetYear,
      user.getDataValue("totalPresence"),
      totalLeaveDays,
      holidays,
      salaryCuts
    );

    const { base_salary, transport_allowance, meal_allowance } = user.position;

    const net_salary =
      base_salary +
      transport_allowance +
      meal_allowance +
      overtimePay -
      totalCut;

    return {
      user_id: user.id,
      base_salary,
      transport_allowance,
      meal_allowance,
      net_salary,
      overtimes: overtimePay,
      cuts: totalCut,
    };
  });

  return reports.filter((report) => report !== null);
};

const createWageReports = async (userId, targetMonth, targetYear) => {
  const targetStartDate = moment([targetYear, targetMonth - 1, 1]);
  const targetEndDate = moment(targetStartDate).endOf("month");
  const user = await User.findOne({
    where: { id: userId, archived: false, role: "employee" },
    attributes: data.attributes,
    include: data.include(
      targetMonth,
      targetYear,
      targetStartDate,
      targetEndDate
    ),
    group: ["User.id", "position.id", "leaves.id"],
  });

  if (!user) return null;

  const salaryCuts = await getSalaryCuts();
  const holidays = await getTotalHoliday(targetYear, targetMonth);

  const totalLeaveDays = user.leaves.reduce((total, leave) => {
    const leaveStartDate = moment(leave.start_date);
    const leaveEndDate = moment(leave.end_date);

    const effectiveStartDate = leaveStartDate.isBefore(targetStartDate)
      ? targetStartDate
      : leaveStartDate;
    const effectiveEndDate = leaveEndDate.isAfter(targetEndDate)
      ? targetEndDate
      : leaveEndDate;

    const leaveDays = effectiveEndDate.diff(effectiveStartDate, "days") + 1;

    return (
      total +
      (leaveStartDate.isBefore(targetEndDate) &&
      leaveEndDate.isAfter(targetStartDate)
        ? leaveDays
        : 0)
    );
  }, 0);

  const overtimePay = calculateOvertimePay(
    user.dataValues.totalOvertimeHours,
    user.position.base_salary
  );

  const totalCut = calculateCut(
    targetMonth,
    targetYear,
    user.dataValues.totalPresence,
    totalLeaveDays,
    holidays,
    salaryCuts
  );

  const { base_salary, transport_allowance, meal_allowance } = user.position;

  const net_salary =
    base_salary + transport_allowance + meal_allowance + overtimePay - totalCut;

  return {
    user_id: user.id,
    base_salary,
    transport_allowance,
    meal_allowance,
    net_salary,
    overtimes: overtimePay,
    cuts: totalCut,
  };
};

const getSalaryCuts = async () => {
  return await SalaryCut.findAll({
    where: { archived: false },
    attributes: ["type", "cut"],
  });
};

const getTotalHoliday = async (year, month) => {
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

const calculateOvertimePay = (hours, base_salary) => {
  const overtimeHours = parseFloat(hours) || 0;
  const baseSalary = parseFloat(base_salary) || 0;
  const hourlyRate = baseSalary / 173;

  return Math.ceil(overtimeHours > 0 ? hourlyRate * 1.5 * overtimeHours : 0);
};

const calculateCut = (
  month,
  year,
  totalPresence,
  totalLeave,
  holidays,
  cuts
) => {
  const days = new Date(year, month, 0).getDate();

  const weekends = Array.from(
    { length: days },
    (_, i) => new Date(year, month - 1, i + 1)
  ).filter((date) => date.getDay() === 0 || date.getDay() === 6).length;

  const alphaCut = cuts.find((cut) => cut.type === "alpha")?.cut || 0;

  const totalAlphaCut = Math.max(
    0,
    (days - weekends - holidays - totalPresence - totalLeave) * alphaCut
  );

  const totalCut = cuts.reduce(
    (acc, curr) => acc + (curr.type !== "alpha" ? curr.cut : 0),
    0
  );

  return totalAlphaCut + totalCut;
};

module.exports = {
  createWageReports,
  createWageReportsForAllUsers,
};
