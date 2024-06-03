const { where } = require("sequelize");
const { Overtime, User } = require("../models");
const overtimeValidator = require("../utils/validator/overtimeValidator");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");

const overtimeController = {
  // Create a new overtime
  create: async (req, res) => {
    // Validate request body
    const { error } = overtimeValidator.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: "gagal", error: error.details[0].message });
    }

    // Check if the user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({
        status: "gagal",
        error: "User tidak ditemukan. Gagal insert data lembur.",
      });
    }

    try {
      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      const newOvertime = await Overtime.create({
        user_id: user_id,
        date,
        time_in,
        time_out,
        creation_time: now,
        create_id: uuidv4(),
        update_time: now,
        update_id: uuidv4(),
      });
      res.status(201).json({ status: "sukses", data: newOvertime });
    } catch (err) {
      res.status(500).json({ status: "error", data: error.message });
    }
  },

  // Retrieve all overtime
  findAll: async (req, res) => {
    try {
      const overtime = await Overtime.findAll({
        where: { archived: false },
      });
      res.status(200).json({ status: "sukses", data: overtime });
    } catch (error) {
      res.status(500).json({ status: "error", data: error.message });
    }
  },

  findAllForEmployee: async (req, res) => {
    try {
      const overtime = await User.findOne({
        where: { id: req.user.id },
        include: { model: Overtime, as: "overtimes" },
        attributes: ["id", "email", "role"],
      });
      res.status(200).json({ status: "sukses", data: overtime });
    } catch (error) {
      res.status(500).json({ status: "error", data: error.message });
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
      if (overtime) {
        res.status(200).json({ status: "sukses", data: overtime });
      } else {
        res
          .status(404)
          .json({ status: "gagal", message: "Overtime not found." });
      }
    } catch (error) {
      res.status(500).json({ status: "error", data: error.message });
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
      if (overtime) {
        res.status(200).json({ status: "sukses", data: overtime });
      } else {
        res.status(404).json({ message: "Overtime not found." });
      }
    } catch (error) {
      res.status(500).json({ status: "error", data: error.message });
    }
  },

  // Update a overtime
  update: async (req, res) => {
    try {
      // Validate request body
      const optionalOvertimeValidator = overtimeValidator.fork(
        ["date", "time_in", "time_out"],
        (schema) => schema.optional()
      );
      const { error, value } = optionalOvertimeValidator.validate(req.body);
      console.log(value);
      if (error) {
        return res
          .status(400)
          .json({ status: "sukses", error: error.details[0].message });
      }
      const updateData = await Overtime.update(
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
      if (updateData[0] == 1) {
        res.status(200).json({
          status: "sukses",
          message: "Data lembur berhasil diupdate.",
        });
      } else {
        res.status(400).json({
          status: "sukses",
          message: `Data lembur gagal diupdate`,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error updating Overtime with id =" + req.user.id,
      });
    }
  },

  // Delete a overtime
  delete: async (req, res) => {
    try {
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
      if (data[0] == 0) {
        res.status(404).json({
          status: "gagal",
          message: "Lembur tidak ditemukan",
        });
        return;
      }
      res.status(200).json({
        status: "sukses",
        message: "Lembur berhasil dihapus",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Could not delete Overtime with id=" + id,
      });
    }
  },
};

module.exports = overtimeController;
