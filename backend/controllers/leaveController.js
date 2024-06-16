const { Leave, User } = require("../models");
const leaveValidator = require("../utils/validator/leaveValidator");
const { handleFailed, handleError } = require("../utils/response");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");

const leaveController = {
  // Create a new leave
  create: async (req, res) => {
    const { error, value } = leaveValidator.validate(req.body);
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
        "Karyawan tidak ditemukan. Gagal insert data cuti."
      );

    try {
      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      await Leave.create({
        ...value,
        status: "diproses",
        creation_time: now,
        create_id: uuidv4(),
        update_time: now,
        update_id: uuidv4(),
      });
      res
        .status(201)
        .json({ status: "sukses", message: "Berhasil insert data cuti" });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  createForUser: async (req, res) => {
    const optionalLeaveValidator = leaveValidator.fork(
      ["user_id", "status"],
      (schema) => schema.forbidden()
    );
    const { error, value } = optionalLeaveValidator.validate(req.body);
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
        "Karyawan tidak ditemukan. Gagal insert data cuti."
      );

    try {
      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      await Leave.create({
        ...value,
        user_id: req.user.id,
        status: "diproses",
        creation_time: now,
        create_id: uuidv4(),
        update_time: now,
        update_id: uuidv4(),
      });
      res
        .status(201)
        .json({ status: "sukses", message: "Berhasil insert data cuti" });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve all leaves
  findAll: async (req, res) => {
    try {
      const leave = await Leave.findAll({
        where: { archived: false },
        include: {
          model: User,
          as: "user",
          where: { archived: false },
          required: false,
          attributes: ["name"],
        },
      });
      res.status(200).json({ status: "sukses", data: leave });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  findAllForEmployee: async (req, res) => {
    try {
      const leave = await User.findOne({
        where: { id: req.user.id, archived: false },
        include: {
          model: Leave,
          as: "leaves",
          where: { archived: false },
          required: false,
        },
        attributes: ["id", "email", "role"],
      });
      res.status(200).json({ status: "sukses", data: leave });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve a single leave by ID
  findOne: async (req, res) => {
    try {
      const leave = await Leave.findOne({
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
      if (leave) {
        res.status(200).json({ status: "sukses", data: leave });
      } else {
        handleFailed(res, 404, "Data cuti tidak ditemukan.");
      }
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  findOneForEmployee: async (req, res) => {
    try {
      const leave = await Leave.findOne({
        where: {
          id: req.params.id,
          archived: false,
          user_id: req.user.id,
        },
      });
      if (leave) {
        res.status(200).json({ status: "sukses", data: leave });
      } else {
        handleFailed(res, 404, "Data cuti tidak ditemukan.");
      }
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Update a leave
  update: async (req, res) => {
    try {
      // Validate request body
      const optionalLeaveValidator = leaveValidator.fork(
        ["status", "type", "reasoning", "start_date", "end_date"],
        (schema) => schema.optional()
      );
      const { error, value } = optionalLeaveValidator.validate(req.body);
      if (error) {
        return handleFailed(res, 400, error.details[0].message);
      }

      const existingLeave = await Leave.findOne({
        where: {
          id: req.params.id,
          user_id: value.user_id,
          archived: false,
        },
      });

      if (!existingLeave) {
        return handleFailed(res, 404, "Data cuti tidak ditemukan");
      }

      if (
        existingLeave.status === "disetujui" &&
        req.user.role === "employee"
      ) {
        return handleFailed(
          res,
          403,
          "Karyawan tidak dapat mengupdate data cuti yang telah disetujui"
        );
      }

      const updateData = await Leave.update(
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
        return handleFailed(res, 400, "Data cuti gagal diupdate");

      res.status(200).json({
        status: "sukses",
        message: "Data cuti berhasil diupdate.",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Delete a leave
  delete: async (req, res) => {
    try {
      const existingLeave = await Leave.findOne({
        where: {
          id: req.params.id,
          archived: false,
        },
      });

      if (!existingLeave) {
        return handleFailed(res, 404, "Data cuti tidak ditemukan");
      }

      if (
        existingLeave.status === "disetujui" &&
        req.user.role === "employee"
      ) {
        return handleFailed(
          res,
          403,
          "Karyawan tidak dapat menghapus data cuti yang telah disetujui"
        );
      }

      const data = await Leave.update(
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
        return handleFailed(res, 400, "Data cuti gagal dihapus");

      res.status(200).json({
        status: "sukses",
        message: "Data cuti berhasil dihapus",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },
};

module.exports = leaveController;
