const { AttendanceTime } = require("../models"); // Adjust the path as necessary to your models' index.js
const attendanceTimeValidator = require("../utils/validator/attendanceTimeValidator");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const { handleFailed, handleError } = require("../utils/response");

const attendanceTimeController = {
  // Retrieve all attendance time
  findAll: async (req, res) => {
    try {
      const data = await AttendanceTime.findAll({ where: { archived: false } });
      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve a single attendance time by ID
  findOne: async (req, res) => {
    try {
      const data = await AttendanceTime.findOne({
        where: { archived: false, id: req.params.id },
      });
      if (data == null) return handleFailed(res, 404, "Posisi tidak ditemukan");

      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Update a position
  update: async (req, res) => {
    try {
      const optionalattendanceTimeValidator = attendanceTimeValidator.fork(
        ["start_time", "end_time"],
        (schema) => schema.optional()
      );
      const { error, value } = optionalattendanceTimeValidator.validate(
        req.body
      );
      if (error) return handleFailed(res, 400, error.details[0].message);

      const data = await AttendanceTime.update(
        {
          ...value,
          update_time: moment()
            .tz("Asia/Jakarta")
            .format("YYYY-MM-DD HH:mm:ss"),
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
        return handleFailed(res, 400, "Gagal memperbarui Waktu absensi");

      res.status(200).json({
        status: "sukses",
        message: "Waktu absensi berhasil diperbarui",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },
};

module.exports = attendanceTimeController;
