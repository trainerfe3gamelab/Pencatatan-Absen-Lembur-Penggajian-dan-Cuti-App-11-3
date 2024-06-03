const { Position } = require("../models"); // Adjust the path as necessary to your models' index.js
const positionValidator = require("../utils/validator/positionValidator");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const { handleFailed, handleError } = require("../utils/response");

const positionController = {
  // Create a new position
  create: async (req, res) => {
    try {
      const { error, value } = positionValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);

      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
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
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
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
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve a single position by ID
  findOne: async (req, res) => {
    try {
      const data = await Position.findOne({
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
      if (error) return handleFailed(res, 400, error.details[0].message);

      const data = await Position.update(
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
        return handleFailed(res, 400, "Gagal memperbarui posisi");

      res.status(200).json({
        status: "sukses",
        message: "Posisi berhasil diperbarui",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
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
      if (data[0] == 0)
        return handleFailed(res, 400, "Gagal memperbarui posisi");

      res.status(200).json({
        status: "sukses",
        message: "Posisi berhasil dihapus",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },
};

module.exports = positionController;
