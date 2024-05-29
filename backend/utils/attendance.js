const { AttendanceTime, Holiday, Leave } = require("../models"); // Adjust the path as necessary to your models' index.js
const moment = require("moment-timezone");
const { Op } = require("sequelize");

const getAttendanceTime = async (attendanceTimeId) => {
  return await AttendanceTime.findOne({
    where: { archived: false, id: attendanceTimeId },
  });
};

const isTodayAHoliday = async () => {
  try {
    const today = moment.tz("Asia/Jakarta").startOf("day").toDate();
    const endOfToday = moment.tz("Asia/Jakarta").endOf("day").toDate();

    const holiday = await Holiday.findOne({
      where: {
        archived: false,
        start_date: { [Op.lte]: endOfToday },
        end_date: { [Op.gte]: today },
      },
    });
    return holiday;
  } catch (error) {
    console.error("Error checking holiday status:", error);
    return null;
  }
};

const isTodayOnLeave = async (userId) => {
  try {
    const today = moment.tz("Asia/Jakarta").startOf("day").toDate();
    const endOfToday = moment.tz("Asia/Jakarta").endOf("day").toDate();

    const leave = await Leave.findOne({
      where: {
        user_id: userId,
        archived: false,
        start_date: { [Op.lte]: endOfToday },
        end_date: { [Op.gte]: today },
      },
    });

    return leave;
  } catch (error) {
    console.error("Error checking leave status:", error);
    return null;
  }
};
isTodayAHoliday();

module.exports = { getAttendanceTime, isTodayAHoliday, isTodayOnLeave };
