const { Leave, User } = require("../models");
const leaveValidator = require("../utils/validator/leaveValidator");

const leaveController = {
  // Create a new leave
  create: async (req, res) => {
    const { type, reasoning, user_id, start_date, end_date } = req.body;

    // Validate request body
    const { error } = leaveValidator.validate({
      user_id,
      type,
      reasoning,
      start_date,
      end_date,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the user exists
    if (user_id) {
      const user = await User.findOne({
        where: {
          id: user_id,
          role: "employee",
        },
      });
      if (!user) {
        return res.status(400).json({
          message: "Karyawan tidak ditemukan. Gagal insert data cuti.",
        });
      }
    }
    try {
      await Leave.create({
        user_id: user_id || req.user.id,
        type,
        reasoning,
        start_date,
        end_date,
        creation_time: new Date(),
        create_id: req.user.id,
        update_time: new Date(),
        update_id: req.user.id,
      });
      res.status(201).json({ message: "Berhasil insert data cuti" });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Retrieve all leaves
  findAll: async (req, res) => {
    try {
      const leave = await Leave.findAll({
        where: { archived: false },
      });
      res.status(200).json({ data: leave });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  findAllForEmployee: async (req, res) => {
    try {
      const leave = await Leave.findAll({
        where: { archived: false, user_id: req.user.id },
      });
      res.status(200).json({ data: leave });
    } catch (error) {
      res.status(500).json(error);
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
      });
      if (leave) {
        res.status(200).json({ data: leave });
      } else {
        res.status(404).json({ message: "Leave not found." });
      }
    } catch (error) {
      res.status(500).json(error);
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
        res.status(200).json({ data: leave });
      } else {
        res.status(404).json({ message: "Leave not found." });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Update a leave (#BELUM DIEDIT)###
  update: async (req, res) => {
    try {
      const { type, reasoning, start_date, end_date } = req.body;

      // Validate request body
      const { error } = leaveValidator.validate({
        type,
        reasoning,
        start_date,
        end_date,
      });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const updateData = await Leave.update(
        {
          type,
          reasoning,
          start_date,
          end_date,
          update_time: new Date(),
          update_id: req.user.id,
        },
        {
          where: {
            id: req.params.id,
            archived: false,
          },
        }
      );
      if (updateData[0] == 1) {
        res.status(200).json({
          message: "Data cuti berhasil diupdate.",
        });
      } else {
        res.status(400).json({
          message: `Data cuti gagal diupdate`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error updating Leave with id=" + req.params.id,
      });
    }
  },

  // Delete a leave
  delete: async (req, res) => {
    try {
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
      if (data[0] == 0) {
        res.status(404).json({
          status: "gagal",
          message: "Data cuti tidak ditemukan",
        });
        return;
      }
      res.status(200).json({
        status: "sukses",
        message: "Data cuti berhasil dihapus",
      });
    } catch (error) {
      res.status(500).json({
        message: "Could not delete Leave with id=" + id,
      });
    }
  },
};

module.exports = leaveController;
