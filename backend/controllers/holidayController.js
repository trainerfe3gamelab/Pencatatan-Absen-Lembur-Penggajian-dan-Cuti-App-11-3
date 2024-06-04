const { Holiday } = require("../models"); // Adjust the path as necessary to your models' index.js
const holidayValidator = require("../utils/validator/holidayValidator");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const { handleFailed, handleError } = require("../utils/response");

const holidayController = {
  // Create a new holiday
  create: async (req, res) => {
    try {
      const { error, value } = holidayValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);

      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      const data = await Holiday.create({
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

  // Retrieve all holidays
  findAll: async (req, res) => {
    try {
      const data = await Holiday.findAll({ where: { archived: false } });
      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve a single holiday by ID
  findOne: async (req, res) => {
    try {
      const data = await Holiday.findOne({
        where: { archived: false, id: req.params.id },
      });
      if (data == null)
        return handleFailed(res, 404, "Hari libur tidak ditemukan");

      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Update a holiday
  update: async (req, res) => {
    try {
      const optionalholidayValidator = holidayValidator.fork(
        ["name", "start_date", "end_date"],
        (schema) => schema.optional()
      );
      const { error, value } = optionalholidayValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);

      const data = await Holiday.update(
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
        return handleFailed(res, 400, "Gagal memperbarui Hari libur");

      res.status(200).json({
        status: "sukses",
        message: "Hari libur berhasil diperbarui",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Delete a holiday
  delete: async (req, res) => {
    try {
      const data = await Holiday.update(
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
        return handleFailed(res, 400, "Gagal memperbarui Hari libur");

      res.status(200).json({
        status: "sukses",
        message: "Hari libur berhasil dihapus",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },
};

module.exports = holidayController;
