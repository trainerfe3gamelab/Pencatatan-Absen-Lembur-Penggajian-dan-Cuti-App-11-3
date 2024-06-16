const { Overtime, User } = require("../models");
const overtimeValidator = require("../utils/validator/overtimeValidator");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const { handleFailed, handleError } = require("../utils/response");

const overtimeController = {
  // Create a new overtime
  create: async (req, res) => {
    const { error, value } = overtimeValidator.validate(req.body);
    if (error) return handleFailed(res, 400, error.details[0].message);

    // Check if the user exists
    const user = await User.findOne({
      where: {
        id: value.user_id,
        role: "employee",
        archived: false,
      },
    });
    if (!user)
      return handleFailed(
        res,
        400,
        "User tidak ditemukan. Gagal insert data lembur"
      );

    try {
      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      const newOvertime = await Overtime.create({
        ...value,
        status: "diproses",
        creation_time: now,
        create_id: uuidv4(),
        update_time: now,
        update_id: uuidv4(),
      });
      res.status(201).json({ status: "sukses", data: newOvertime });
    } catch (err) {
      console.log(err.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  createForUser: async (req, res) => {
    const optionalOvertimeValidator = overtimeValidator.fork(
      ["user_id", "status"],
      (schema) => schema.forbidden()
    );
    const { error, value } = optionalOvertimeValidator.validate(req.body);
    if (error) return handleFailed(res, 400, error.details[0].message);

    // Check if the user exists
    const user = await User.findOne({
      where: {
        id: req.user.id,
        role: "employee",
        archived: false,
      },
    });
    if (!user)
      return handleFailed(
        res,
        400,
        "User tidak ditemukan. Gagal insert data lembur"
      );

    try {
      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      const newOvertime = await Overtime.create({
        ...value,
        user_id: req.user.id,
        status: "diproses",
        creation_time: now,
        create_id: uuidv4(),
        update_time: now,
        update_id: uuidv4(),
      });
      res.status(201).json({ status: "sukses", data: newOvertime });
    } catch (err) {
      console.log(err.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve all overtime
  findAll: async (req, res) => {
    try {
      const overtime = await Overtime.findAll({
        where: { archived: false },
      });
      res.status(200).json({ status: "sukses", data: overtime });
    } catch (err) {
      console.log(err.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  findAllForEmployee: async (req, res) => {
    try {
      const overtime = await User.findOne({
        where: { id: req.user.id, archived: false },
        include: {
          model: Overtime,
          as: "overtimes",
          where: { archived: false },
          required: false,
        },
        attributes: ["id", "email", "role"],
      });
      res.status(200).json({ status: "sukses", data: overtime });
    } catch (err) {
      console.log(err.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve a single overtime by ID
  findOne: async (req, res) => {
    try {
      const overtime = await Overtime.findOne({
        where: {
          id: req.params.id,
          archived: false,
        },
      });

      if (!overtime)
        return handleFailed(res, 400, "Data lembur tidak ditemukan");

      res.status(200).json({ status: "sukses", data: overtime });
    } catch (err) {
      console.log(err.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  findOneForEmployee: async (req, res) => {
    try {
      const overtime = await Overtime.findOne({
        where: {
          id: req.params.id,
          archived: false,
          user_id: req.user.id,
        },
      });
      if (!overtime)
        return handleFailed(res, 400, "Data lembur tidak ditemukan");

      res.status(200).json({ status: "sukses", data: overtime });
    } catch (err) {
      console.log(err.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Update a overtime
  update: async (req, res) => {
    try {
      // Validate request body
      const optionalOvertimeValidator = overtimeValidator.fork(
        ["status", "date", "time_in", "time_out"],
        (schema) => schema.optional()
      );
      const { error, value } = optionalOvertimeValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);

      const existingOvertime = await Overtime.findOne({
        where: {
          id: req.params.id,
          user_id: value.user_id,
          archived: false,
        },
      });

      if (!existingOvertime) {
        return handleFailed(res, 404, "Data lembur tidak ditemukan");
      }

      if (
        existingOvertime.status === "disetujui" &&
        req.user.role === "employee"
      ) {
        return handleFailed(
          res,
          403,
          "Karyawan tidak dapat mengupdate data lembur yang telah disetujui"
        );
      }

      const updateData = await Overtime.update(
        {
          ...value,
          user_id: req.user.role == "employee" ? req.user.id : value.user_id,
          update_time: moment()
            .tz("Asia/Jakarta")
            .format("YYYY-MM-DD HH:mm:ss"),
          update_id: uuidv4(),
        },
        {
          where: {
            id: req.params.id,
            user_id: req.user.role == "employee" ? req.user.id : value.user_id,
            archived: false,
          },
        }
      );
      if (updateData[0] == 0)
        return handleFailed(res, 400, "Data lembur berhasil diperbarui");

      res.status(200).json({
        status: "sukses",
        message: "Data lembur berhasil diperbarui.",
      });
    } catch (err) {
      console.log(err.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Delete a overtime
  delete: async (req, res) => {
    try {
      const existingOvertime = await Overtime.findOne({
        where: {
          id: req.params.id,
          archived: false,
        },
      });

      if (!existingOvertime) {
        return handleFailed(res, 404, "Data lembur tidak ditemukan");
      }

      if (
        existingOvertime.status === "disetujui" &&
        req.user.role === "employee"
      ) {
        return handleFailed(
          res,
          403,
          "Karyawan tidak dapat menghapus data lembur yang telah disetujui"
        );
      }

      const data = await Overtime.update(
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
        return handleFailed(res, 400, "Data lembur gagal dihapus");

      res.status(200).json({
        status: "sukses",
        message: "Lembur berhasil dihapus",
      });
    } catch (err) {
      console.log(err.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },
};

module.exports = overtimeController;
