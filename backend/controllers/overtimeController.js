const { Overtime, User } = require("../models");
const overtimeValidator = require("../utils/validator/overtimeValidator");

const overtimeController = {
  // Create a new overtime
  create: async (req, res) => {
    const { date, time_in, time_out, user_id } = req.body;

    // Validate request body
    const { error } = overtimeValidator.validate({
      user_id,
      date,
      time_in,
      time_out,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the user exists
    if (user_id) {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res
          .status(400)
          .json({ error: "User tidak ditemukan. Gagal insert data lembur." });
      }
    }
    try {
      const newOvertime = await Overtime.create({
        user_id: user_id || req.user.id,
        date,
        time_in,
        time_out,
        creation_time: new Date(),
        create_id: req.user.id,
        update_time: new Date(),
        update_id: req.user.id,
      });
      res.status(201).json({ data: newOvertime });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Retrieve all overtime
  findAll: async (req, res) => {
    try {
      const overtime = await Overtime.findAll({
        where: { archived: false },
      });
      res.status(200).json({ data: overtime });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  findAllForEmployee: async (req, res) => {
    try {
      const overtime = await Overtime.findAll({
        where: { archived: false, user_id: req.user.id },
      });
      res.status(200).json({ data: overtime });
    } catch (error) {
      res.status(500).json(error);
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
        res.status(200).json({ data: overtime });
      } else {
        res.status(404).json({ message: "Overtime not found." });
      }
    } catch (error) {
      res.status(500).json(error);
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
        res.status(200).json({ data: overtime });
      } else {
        res.status(404).json({ message: "Overtime not found." });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Update a overtime
  update: async (req, res) => {
    try {
      const { user_id, date, time_in, time_out } = req.body;

      // Validate request body
      const { error } = overtimeValidator.validate({
        user_id,
        date,
        time_in,
        time_out,
      });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const updateData = await Overtime.update(
        {
          date,
          time_in,
          time_out,
          update_time: new Date(),
          update_id: user_id || req.user.id,
        },
        {
          where: {
            id: req.params.id,
            user_id: user_id || req.user.id,
            archived: false,
          },
        }
      );
      if (updateData[0] == 1) {
        res.status(200).json({
          message: "Data lembur berhasil diupdate.",
        });
      } else {
        res.status(400).json({
          message: `Data lembur gagal diupdate`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error updating Overtime with id=" + id,
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
        message: "Could not delete Overtime with id=" + id,
      });
    }
  },
};

module.exports = overtimeController;
