const { User, Attendance } = require("../models"); // Adjust the path as necessary to your models' index.js
const attendanceValidator = require("../utils/validator/attendanceValidator");
const { handleFailed, handleError } = require("../utils/response");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const {
  checkWeekend,
  checkHolidayAndLeave,
  handleAttendanceCheck,
  handleCreateOrUpdateAttendance,
  getAttendanceTime,
  isAfterCompareTime,
} = require("../utils/attendance");

const attendanceController = {
  // Create a new attendance
  create: async (req, res) => {
    try {
      const { error, value } = attendanceValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);

      const now = moment.tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      const data = await Attendance.create({
        ...value,
        creation_time: now,
        update_time: now,
        create_id: uuidv4(),
        update_id: uuidv4(),
      });
      res.status(201).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  //in attendance
  in: async (req, res) => {
    try {
      const currentTime = moment().tz("Asia/Jakarta").format("HH:mm:ss");

      const checkTimeOut = await getAttendanceTime("keluar");

      if (isAfterCompareTime(currentTime, checkTimeOut.start_time)) {
        return handleFailed(res, 400, "Tidak bisa melakukan absensi masuk");
      }

      if (checkWeekend()) {
        return handleFailed(res, 400, "Hari ini adalah hari weekend");
      }

      const currentDate = moment().tz("Asia/Jakarta").format("YYYY-MM-DD");
      const attendanceCheck = await Attendance.findOne({
        where: {user_id: req.user.id, archived: false, date: currentDate },
      });

      if (attendanceCheck) {
        return handleFailed(
          res,
          400,
          "Sudah melakukan presensi masuk hari ini"
        );
      }

      const holidayAndLeaveCheck = await checkHolidayAndLeave(req.user.id);
      if (holidayAndLeaveCheck) {
        return handleFailed(res, 400, holidayAndLeaveCheck);
      }

      const { status, attendanceTime } = await handleAttendanceCheck(
        "masuk",
        currentTime,
        currentDate
      );
      if (status === "Belum waktunya melakukan absensi masuk") {
        return handleFailed(res, 400, status);
      }

      const value = {
        user_id: req.user.id,
        time_in: currentTime,
        time_out: null,
        date: currentDate,
        status: status,
      };

      const data = await handleCreateOrUpdateAttendance(value, null);

      res.status(201).json({ status: "sukses", data });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  //out attendance
  out: async (req, res) => {
    try {
      if (checkWeekend()) {
        return handleFailed(res, 400, "Hari ini adalah hari weekend");
      }

      const currentDate = moment().tz("Asia/Jakarta").format("YYYY-MM-DD");
      const attendanceCheck = await Attendance.findOne({
        where: {user_id: req.user.id, archived: false, date: currentDate },
      });

      if (attendanceCheck && attendanceCheck.time_out) {
        return handleFailed(
          res,
          400,
          "Sudah melakukan presensi keluar hari ini"
        );
      }

      const holidayAndLeaveCheck = await checkHolidayAndLeave(req.user.id);
      if (holidayAndLeaveCheck) {
        return handleFailed(res, 400, holidayAndLeaveCheck);
      }

      const currentTime = moment().tz("Asia/Jakarta").format("HH:mm:ss");
      const { status, attendanceTime } = await handleAttendanceCheck(
        "keluar",
        currentTime,
        currentDate
      );
      if (status === "Belum waktunya melakukan absensi keluar") {
        return handleFailed(res, 400, status);
      }

      let outStatus = "";
      if (
        (attendanceCheck && attendanceCheck.status == "alpha") ||
        (attendanceCheck && attendanceCheck.status == "telat")
      ) {
        outStatus = attendanceCheck.status;
      } else if (attendanceCheck == null) {
        outStatus = "alpha";
      } else {
        outStatus = status;
      }

      const value = {
        user_id: req.user.id,
        time_out: currentTime,
        date: currentDate,
        status: outStatus,
        time_in: attendanceCheck ? attendanceCheck.time_in : null,
      };

      const data = await handleCreateOrUpdateAttendance(value, attendanceCheck);

      res.status(201).json({ status: "sukses", data });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve all attendances
  findAll: async (req, res) => {
    try {
      const data = await Attendance.findAll({ where: { archived: false } });
      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  findAllForEmployee: async (req, res) => {
    try {
      const attendance = await User.findOne({
        where: { id: req.user.id, archived: false },
        include: {
          model: Attendance,
          as: "attendances",
          where: { archived: false },
          required: false,
        },
        attributes: ["id", "email", "role"],
      });
      res.status(200).json({ status: "sukses", data: attendance });
    } catch (error) {
      console.log(err.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve a single attendance by ID
  findOne: async (req, res) => {
    try {
      const data = await Attendance.findOne({
        where: { archived: false, id: req.params.id },
      });
      if (data == null)
        return handleFailed(res, 400, "Presensi tidak ditemukan");

      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  findOneForEmployee: async (req, res) => {
    try {
      const data = await Attendance.findOne({
        where: { archived: false, id: req.params.id, user_id: req.user.id },
      });
      if (data == null)
        return handleFailed(res, 400, "Presensi tidak ditemukan");

      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Update a attendance
  update: async (req, res) => {
    try {
      const optionalAttendanceValidator = attendanceValidator.fork(
        ["user_id", "date", "time_in", "time_out", "status"],
        (schema) => schema.optional()
      );

      const { error, value } = optionalAttendanceValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error?.details[0]?.message);

      const data = await Attendance.update(
        {
          ...value,
          update_time: moment.tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
          update_id: uuidv4(),
        },
        {
          where: {
            id: req.params.id,
            archived: false,
          },
        }
      );

      if (data[0] == 0)
        return res.status(404).json({
          status: "gagal",
          message: "Data presensi tidak ditemukan",
        });

      res.status(200).json({
        status: "sukses",
        message: "Presensi berhasil diperbarui",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Delete a attendance
  delete: async (req, res) => {
    try {
      const data = await Attendance.update(
        {
          archived: true,
        },
        {
          where: {
            id: req.params.id,
            archived: false,
          },
        }
      );
      if (data[0] == 0) {
        res.status(404).json({
          status: "gagal",
          message: "Presensi tidak ditemukan",
        });
        return;
      }
      res.status(200).json({
        status: "sukses",
        message: "Presensi berhasil dihapus",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },
};

module.exports = attendanceController;
