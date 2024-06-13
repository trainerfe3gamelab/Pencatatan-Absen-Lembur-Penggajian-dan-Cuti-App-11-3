const { AttendanceReport, User } = require("../models");
const attendanceReportValidator = require("../utils/validator/attendanceReportValidator");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const { handleFailed, handleError } = require("../utils/response");
const {
  createAttendanceReports,
  createAttendanceReportsForAllUsers,
} = require("../utils/attendanceReport");

const attendanceReportController = {
  // Create a new attendanceReport
  create: async (req, res) => {
    // Validate request body
    const optionalattendanceReportValidator = attendanceReportValidator.fork(
      ["hadir", "sakit", "izin", "alpha"],
      (schema) => schema.forbidden()
    );
    const { error, value } = optionalattendanceReportValidator.validate(
      req.body
    );
    if (error) return handleFailed(res, 400, error.details[0].message);

    try {
      const attendanceReport = await createAttendanceReports(
        value.user_id,
        value.month,
        value.year
      );

      if (!attendanceReport)
        return handleFailed(res, 404, "user_id tidak ditemukan");
      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      const data = await AttendanceReport.create({
        ...attendanceReport,
        month: value.month,
        year: value.year,
        creation_time: now,
        update_time: now,
        create_id: uuidv4(),
        update_id: uuidv4(),
      });
      res.status(201).json({ status: "sukses", data: data });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  createAll: async (req, res) => {
    // Validate request body
    const optionalAttendanceReportValidator = attendanceReportValidator.fork(
      ["user_id", "hadir", "sakit", "izin", "alpha"],
      (schema) => schema.forbidden()
    );

    const { error, value } = optionalAttendanceReportValidator.validate(
      req.body
    );
    if (error) return handleFailed(res, 400, error.details[0].message);

    try {
      // Call the function to create attendance reports for all users
      const attendanceReports = await createAttendanceReportsForAllUsers(
        value.month,
        value.year
      );

      if (!attendanceReports || attendanceReports.length === 0) {
        return handleFailed(
          res,
          404,
          "Tidak ada data laporan kehadiran yang ditemukan"
        );
      }

      // Format the current time
      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");

      // Add metadata to each report
      const reportsToCreate = attendanceReports.map((report) => ({
        ...report,
        month: value.month,
        year: value.year,
        creation_time: now,
        update_time: now,
        create_id: uuidv4(),
        update_id: uuidv4(),
      }));

      // Use bulkCreate to insert all reports at once
      const createdReports = await AttendanceReport.bulkCreate(reportsToCreate);

      res.status(201).json({ status: "sukses", data: createdReports });
    } catch (error) {
      console.error(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },
  // Retrieve all attendanceReport
  findAll: async (req, res) => {
    try {
      const attendanceReport = await AttendanceReport.findAll({
        where: { archived: false },
        include: {
          model: User,
          as: "user",
          where: { archived: false },
          required: false,
          attributes: ["name"],
        },
      });
      res.status(200).json({ status: "sukses", data: attendanceReport });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  findAllForEmployee: async (req, res) => {
    try {
      const attendanceReport = await User.findOne({
        where: { id: req.user.id, archived: false },
        include: {
          model: AttendanceReport,
          as: "attendance_reports",
          where: { archived: false },
          required: false,
        },
        attributes: ["id", "email", "role"],
      });
      res.status(200).json({ status: "sukses", data: attendanceReport });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve a single attendanceReport by ID
  findOne: async (req, res) => {
    try {
      const attendanceReport = await AttendanceReport.findOne({
        where: {
          id: req.params.id,
          archived: false,
        },
        include: {
          model: User,
          as: "user",
          where: { archived: false },
          required: false,
          attributes: ["name"],
        },
      });

      if (!attendanceReport)
        return handleFailed(res, 400, "Data Laporan absensi tidak ditemukan");

      res.status(200).json({ status: "sukses", data: attendanceReport });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  findOneForEmployee: async (req, res) => {
    try {
      const attendanceReport = await AttendanceReport.findOne({
        where: {
          id: req.params.id,
          archived: false,
          user_id: req.user.id,
        },
      });
      if (!attendanceReport)
        return handleFailed(res, 400, "Data Laporan absensi tidak ditemukan");

      res.status(200).json({ status: "sukses", data: attendanceReport });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Update a attendanceReport
  update: async (req, res) => {
    try {
      // Validate request body
      const optionalattendanceReportValidator = attendanceReportValidator.fork(
        ["month", "year", "hadir", "sakit", "izin", "alpha"],
        (schema) => schema.optional()
      );
      const { error, value } = optionalattendanceReportValidator.validate(
        req.body
      );
      if (error) return handleFailed(res, 400, error.details[0].message);
      const updateData = await AttendanceReport.update(
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
            user_id: value.user_id,
            archived: false,
          },
        }
      );
      if (updateData[0] == 0)
        return handleFailed(
          res,
          400,
          "Data Laporan absensi berhasil diperbarui"
        );

      res.status(200).json({
        status: "sukses",
        message: "Data Laporan absensi berhasil diperbarui.",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  delete: async (req, res) => {
    // Validate request body
    const optionalattendanceReportValidator = attendanceReportValidator.fork(
      ["user_id", "hadir", "sakit", "izin", "alpha"],
      (schema) => schema.forbidden()
    );
    const { error, value } = optionalattendanceReportValidator.validate(
      req.body
    );
    if (error) return handleFailed(res, 400, error.details[0].message);
    try {
      const data = await AttendanceReport.update(
        {
          archived: true,
        },
        {
          where: {
            archived: false,
            month: value.month,
            year: value.year,
          },
        }
      );
      if (data[0] == 0)
        return handleFailed(res, 400, "Data Laporan absensi gagal dihapus");

      res.status(200).json({
        status: "sukses",
        message: "Laporan absensi berhasil dihapus",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Delete a attendanceReport
  deleteById: async (req, res) => {
    try {
      const data = await AttendanceReport.update(
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
      if (data[0] == 0)
        return handleFailed(res, 400, "Data Laporan absensi gagal dihapus");

      res.status(200).json({
        status: "sukses",
        message: "Laporan absensi berhasil dihapus",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },
};

module.exports = attendanceReportController;
