const { Attendance } = require("../models"); // Adjust the path as necessary to your models' index.js
const attendanceValidator = require("../utils/validator/attendanceValidator");
const {
  getAttendanceTime,
  isTodayAHoliday,
  isTodayOnLeave,
} = require("../utils/attendance");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const attendanceController = {
  // Create a new attendance
  create: async (req, res) => {
    try {
      const { error, value } = attendanceValidator.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "gagal",
          message: error.details[0].message,
        });
      }
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
      //cek jika hari ini adalah hari weekend
      const isWeekend = moment().locale("id").format("dddd");
      if (isWeekend == "Sabtu" || isWeekend == "Minggu") {
        res.status(400).json({
          status: "gagal",
          message: "Hari ini adalah hari weekend",
        });
        return;
      }

      //cek jika hari ini sudah melakukan absensi masuk
      const currentDate = moment().locale("id").format("YYYY-MM-DD");
      const attendanceCheck = await Attendance.findOne({
        where: { archived: false, date: currentDate },
      });
      if (attendanceCheck) {
        res.status(400).json({
          status: "gagal",
          message: "Sudah melakukan presensi masuk hari ini",
        });
        return;
      }

      //cek jika hari ini adalah hari libur
      const isHoliday = await isTodayAHoliday();
      if (isHoliday) {
        res.status(400).json({
          status: "gagal",
          message: `Hari ini adalah hari libur ${isHoliday.name}`,
        });
        return;
      }

      //cek jika hari ini sedang cuti
      const isOnLeave = await isTodayOnLeave("tes");
      if (isOnLeave) {
        res.status(400).json({
          status: "gagal",
          message: `Hari ini sedang cuti ${isOnLeave.type} dengan alasan ${isOnLeave.reasoning}`,
        });
        return;
      }

      //dapatkan waktu absensi masuk berdasarkan params
      const attendanceTime = await getAttendanceTime(
        req.params.attendanceTimeId
      );
      if (attendanceTime == null) {
        res.status(404).json({
          status: "gagal",
          message: `Waktu absensi dengan id : ${req.params.attendanceTimeId} tidak ditemukan`,
        });
        return;
      }

      const optionalattendanceValidator = attendanceValidator.fork(
        ["date", "time_in", "time_out", "status"],
        (schema) => schema.optional()
      );
      const { error, value } = optionalattendanceValidator.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "gagal",
          message: error.details[0].message,
        });
      }

      //cek jika waktu saat ini adalah waktu absensi masuk
      const currentTime = moment().locale("id").format("HH:mm:ss");
      const { start_time, end_time } = attendanceTime;
      console.log(start_time);
      if (currentTime < start_time) {
        return res.status(400).json({
          status: "gagal",
          message: "Belum waktunya melakukan absensi masuk",
        });
      } else if (currentTime >= start_time && currentTime <= end_time) {
        value["time_in"] = currentTime;
        value["time_out"] = null;
        value["date"] = currentDate;
        value["status"] = "hadir";
      } else if (
        currentTime >
        moment(end_time, "HH:mm:ss").add(2, "hour").format("HH:mm:ss")
      ) {
        value["time_in"] = currentTime;
        value["time_out"] = null;
        value["date"] = currentDate;
        value["status"] = "alpha";
      } else if (currentTime > end_time) {
        value["time_in"] = currentTime;
        value["time_out"] = null;
        value["date"] = currentDate;
        value["status"] = "telat";
      }

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

  //out attendance
  out: async (req, res) => {
    try {
      //cek jika hari ini adalah hari weekend
      const isWeekend = moment().locale("id").format("dddd");
      if (isWeekend == "Sabtu" || isWeekend == "Minggu") {
        res.status(400).json({
          status: "gagal",
          message: "Hari ini adalah hari weekend",
        });
        return;
      }

      //cek jika hari ini sudah melakukan absensi keluar
      const currentDate = moment().locale("id").format("YYYY-MM-DD");
      const attendanceCheck = await Attendance.findOne({
        where: {
          archived: false,
          date: currentDate,
        },
      });

      if (attendanceCheck != null && attendanceCheck.time_out != null) {
        res.status(400).json({
          status: "gagal",
          message: "Sudah melakukan presensi keluar hari ini",
        });
        return;
      }

      //cek jika hari ini adalah hari libur
      const isHoliday = await isTodayAHoliday();
      if (isHoliday) {
        res.status(400).json({
          status: "gagal",
          message: `Hari ini adalah hari libur ${isHoliday.name}`,
        });
        return;
      }

      //cek jika hari ini sedang cuti
      const isOnLeave = await isTodayOnLeave("tes");
      if (isOnLeave) {
        res.status(400).json({
          status: "gagal",
          message: `Hari ini sedang cuti ${isOnLeave.type} dengan alasan ${isOnLeave.reasoning}`,
        });
        return;
      }

      //dapatkan waktu absensi keluar berdasarkan params
      const attendanceTime = await getAttendanceTime(
        req.params.attendanceTimeId
      );
      if (attendanceTime == null) {
        res.status(404).json({
          status: "gagal",
          message: `Waktu absensi dengan id : ${req.params.attendanceTimeId} tidak ditemukan`,
        });
        return;
      }

      const optionalattendanceValidator = attendanceValidator.fork(
        ["date", "time_in", "time_out", "status"],
        (schema) => schema.optional()
      );
      const { error, value } = optionalattendanceValidator.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "gagal",
          message: error.details[0].message,
        });
      }

      //cek jika waktu saat ini adalah waktu absensi keluar
      const currentTime = moment().locale("id").format("HH:mm:ss");
      const { start_time, end_time } = attendanceTime;
      if (currentTime < start_time) {
        return res.status(400).json({
          status: "gagal",
          message: "Belum waktunya melakukan absensi keluar",
        });
      } else if (attendanceCheck == null) {
        value["time_in"] = null;
        value["time_out"] = currentTime;
        value["date"] = currentDate;
        value["status"] = "alpha";
      } else if (
        (currentTime >= start_time && currentTime <= end_time) ||
        currentTime > end_time
      ) {
        value["time_in"] =
          attendanceCheck && attendanceCheck.time_in
            ? attendanceCheck.time_in
            : null;
        value["time_out"] = currentTime;
        value["date"] = currentDate;
        value["status"] = attendanceCheck.status == "alpha" ? "alpha" : "hadir";
      }

      const now = moment().locale("id").format("YYYY-MM-DD HH:mm:ss");

      const data = await Attendance.upsert(
        {
          ...value,
          id: attendanceCheck ? attendanceCheck.id : uuidv4(),
          creation_time: now,
          update_time: now,
          create_id: uuidv4(),
          update_id: uuidv4(),
        },
        { returning: true }
      );
      res.status(201).json({
        status: "sukses",
        data: data[0],
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
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

  findAllForEmployee: async (req, res) => {
    try {
      const data = await Attendance.findAll({
        where: { user_id: req.user.id, archived: false },
      });
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

  findOneForEmployee: async (req, res) => {
    try {
      const data = await Attendance.findOne({
        where: { archived: false, id: req.params.id, user_id: req.user.id },
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
      if (error) {
        res.status(400).json({
          status: "gagal",
          message: error.details[0].message,
        });
        return;
      }
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
