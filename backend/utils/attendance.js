const { AttendanceTime, Holiday, Leave, Attendance } = require("../models"); // Adjust the path as necessary to your models' index.js
const moment = require("moment-timezone");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const isAfterCompareTime = (currentTime, compareTime) => {
  const currentMoment = moment(currentTime, "HH:mm:ss");
  const compareMoment = moment(compareTime, "HH:mm:ss");

  return currentMoment.isAfter(compareMoment);
};

const getAttendanceTime = async (attendanceName) => {
  return await AttendanceTime.findOne({
    where: { archived: false, name: { [Op.like]: `%${attendanceName}` } },
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

const checkWeekend = () => {
  const isWeekend = moment().tz("Asia/Jakarta").format("dddd");
  return isWeekend === "Sabtu" || isWeekend === "Minggu";
};

const checkHolidayAndLeave = async (user_id) => {
  const isHoliday = await isTodayAHoliday();
  if (isHoliday) return `Hari ini adalah hari libur ${isHoliday.name}`;

  const isOnLeave = await isTodayOnLeave(user_id);
  if (isOnLeave)
    return `Hari ini sedang cuti ${isOnLeave.type} dengan alasan ${isOnLeave.reasoning}`;

  return null;
};

const checkAttendanceTime = (currentTime, start_time, end_time, type) => {
  if (currentTime < start_time) {
    return `Belum waktunya melakukan absensi ${type}`;
  } else if (type === "masuk" && currentTime > end_time) {
    if (
      currentTime >
      moment(end_time, "HH:mm:ss").add(2, "hour").format("HH:mm:ss")
    ) {
      return "alpha";
    }
    return "telat";
  }
  return "hadir";
};

const handleAttendanceCheck = async (type, currentTime, currentDate) => {
  const attendanceTime = await getAttendanceTime(type);
  if (!attendanceTime) {
    throw new Error(
      `Waktu absensi dengan id : ${req.params.attendanceTimeId} tidak ditemukan`
    );
  }

  const { start_time, end_time } = attendanceTime;
  const status = checkAttendanceTime(currentTime, start_time, end_time, type);
  return { status, attendanceTime };
};

const handleCreateOrUpdateAttendance = async (value, attendanceCheck) => {
  const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
  if (attendanceCheck) {
    value.id = attendanceCheck.id;
  } else {
    value.id = uuidv4();
  }
  value.creation_time = now;
  value.update_time = now;
  value.create_id = uuidv4();
  value.update_id = uuidv4();

  const data = await Attendance.upsert(value, { returning: true });
  return data[0];
};

module.exports = {
  getAttendanceTime,
  checkWeekend,
  checkHolidayAndLeave,
  handleAttendanceCheck,
  handleCreateOrUpdateAttendance,
  isAfterCompareTime,
};
