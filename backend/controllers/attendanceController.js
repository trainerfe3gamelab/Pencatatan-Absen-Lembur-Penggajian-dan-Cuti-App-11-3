const { Attendance } = require("../models"); // Adjust the path as necessary to your models' index.js
const attendanceValidator = require("../utils/validator/attendanceValidator");
const { handleFailed } = require("../utils/response");
const moment = require("moment");
const {
  checkWeekend,
  checkHolidayAndLeave,
  validateAttendanceData,
  handleAttendanceCheck,
  handleCreateOrUpdateAttendance,
} = require("../utils/attendance");

const attendanceController = {
  // Create a new attendance
  create: async (req, res) => {
    try {
      const { error, value } = attendanceValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);
      const now = moment().locale("id").format("YYYY-MM-DD HH:mm:ss");
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
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },

  //in attendance
  in: async (req, res) => {
    try {
      if (checkWeekend()) {
        return handleFailed(res, 400, "Hari ini adalah hari weekend");
      }

      const currentDate = moment().locale("id").format("YYYY-MM-DD");
      const attendanceCheck = await Attendance.findOne({
        where: { archived: false, date: currentDate },
      });

      if (attendanceCheck) {
        return handleFailed(
          res,
          400,
          "Sudah melakukan presensi masuk hari ini"
        );
      }

      const holidayAndLeaveCheck = await checkHolidayAndLeave("tes");
      console.log(holidayAndLeaveCheck);
      if (holidayAndLeaveCheck) {
        return handleFailed(res, 400, holidayAndLeaveCheck);
      }

      const { error, value } = validateAttendanceData(req);
      if (error) {
        return handleFailed(res, 400, error.details[0].message);
      }

      const currentTime = moment().locale("id").format("HH:mm:ss");
      const { status, attendanceTime } = await handleAttendanceCheck(
        "masuk",
        currentTime,
        currentDate
      );

      if (status === "Belum waktunya melakukan absensi masuk") {
        return handleFailed(res, 400, status);
      }

      value.time_in = currentTime;
      value.time_out = null;
      value.date = currentDate;
      value.status = status;

      const data = await handleCreateOrUpdateAttendance(value, null);

      res.status(201).json({ status: "sukses", data });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  //out attendance
  out: async (req, res) => {
    try {
      if (checkWeekend()) {
        return handleFailed(res, 400, "Hari ini adalah hari weekend");
      }

      const currentDate = moment().locale("id").format("YYYY-MM-DD");
      const attendanceCheck = await Attendance.findOne({
        where: { archived: false, date: currentDate },
      });

      if (attendanceCheck && attendanceCheck.time_out) {
        return handleFailed(
          res,
          400,
          "Sudah melakukan presensi keluar hari ini"
        );
      }

      const holidayAndLeaveCheck = await checkHolidayAndLeave("tes");
      if (holidayAndLeaveCheck) {
        return handleFailed(res, 400, holidayAndLeaveCheck);
      }

      const { error, value } = validateAttendanceData(req);
      if (error) {
        return handleFailed(res, 400, error.details[0].message);
      }

      const currentTime = moment().locale("id").format("HH:mm:ss");
      const { status, attendanceTime } = await handleAttendanceCheck(
        "keluar",
        currentTime,
        currentDate
      );

      if (status === "Belum waktunya melakukan absensi keluar") {
        return handleFailed(res, 400, status);
      }

      value.time_out = currentTime;
      value.date = currentDate;
      value.status =
        (attendanceCheck && attendanceCheck.status == "alpha") ||
        attendanceCheck.status == "telat"
          ? attendanceCheck.status
          : status;
      value.time_in = attendanceCheck ? attendanceCheck.time_in : null;

      const data = await handleCreateOrUpdateAttendance(value, attendanceCheck);

      res.status(201).json({ status: "sukses", data });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
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
      res.status(500).json({
        status: "error",
        message: error.message,
      });
      return;
    }
  },

  // Retrieve a single attendance by ID
  findOne: async (req, res) => {
    try {
      const data = await Attendance.findOne({
        where: { archived: false, id: req.params.id },
      });
      if (data == null) {
        res.status(404).json({
          status: "gagal",
          message: "Presensi tidak ditemukan",
        });
        return;
      }
      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
      return;
    }
  },

  // Update a attendance
  update: async (req, res) => {
    try {
      const optionalattendanceValidator = attendanceValidator.fork(
        ["user_id", "date", "time_in", "time_out", "status"],
        (schema) => schema.optional()
      );
      const { error, value } = optionalattendanceValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);
      const data = await Attendance.update(
        {
          ...value,
          update_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
          update_id: uuidv4(),
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
        message: "Presensi berhasil diperbarui",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
      return;
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
      res.status(500).json({
        status: "error",
        message: error.message,
      });
      return;
    }
  },
};

module.exports = attendanceController;
