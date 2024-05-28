const { Position } = require("../models"); // Adjust the path as necessary to your models' index.js
const positionValidator = require("../utils/validator/positionValidator");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const positionController = {
  // Create a new position
  create: async (req, res) => {
    try {
      const { error, value } = positionValidator.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "gagal",
          message: error.details[0].message,
        });
      }

      const now = moment().locale("id").format("YYYY-MM-DD HH:mm:ss");
      const data = await Position.create({
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

  // Retrieve all positions
  findAll: async (req, res) => {
    try {
      const data = await Position.findAll({ where: { archived: false } });
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

  // Retrieve a single position by ID
  findOne: async (req, res) => {
    try {
      const data = await Position.findOne({
        where: { archived: false, id: req.params.id },
      });
      if (data == null) {
        res.status(404).json({
          status: "gagal",
          message: "Posisi tidak ditemukan",
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

  // Update a position
  update: async (req, res) => {
    try {
      const optionalpositionValidator = positionValidator.fork(
        [
          "position_name",
          "description",
          "base_salary",
          "transport_allowance",
          "meal_allowance",
        ],
        (schema) => schema.optional()
      );
      const { error, value } = optionalpositionValidator.validate(req.body);
      if (error) {
        res.status(400).json({
          status: "gagal",
          message: error.details[0].message,
        });
        return;
      }
      const data = await Position.update(
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
          message: "Posisi tidak ditemukan",
        });
        return;
      }
      res.status(200).json({
        status: "sukses",
        message: "Posisi berhasil diperbarui",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
      return;
    }
  },

  // Delete a position
  delete: async (req, res) => {
    try {
      const data = await Position.update(
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
          message: "Posisi tidak ditemukan",
        });
        return;
      }
      res.status(200).json({
        status: "sukses",
        message: "Posisi berhasil dihapus",
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

module.exports = positionController;
