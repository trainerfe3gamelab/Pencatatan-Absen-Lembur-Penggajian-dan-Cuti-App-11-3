const { SalaryCut } = require("../models"); // Adjust the path as necessary to your models' index.js
const salaryCutValidator = require("../utils/validator/salaryCutValidator");
const moment = require("moment");
const { handleFailed } = require("../utils/response");

const salaryCutController = {
  // Create a new Salary Cut
  create: async (req, res) => {
    try {
      const { error, value } = salaryCutValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);

      const now = moment().locale("id").format("YYYY-MM-DD HH:mm:ss");
      const data = await SalaryCut.create({
        ...value,
        creation_time: now,
        update_time: now,
        create_id: req.user.id,
        update_id: req.user.id,
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

  // Retrieve all salaryCuts
  findAll: async (req, res) => {
    try {
      const data = await SalaryCut.findAll({ where: { archived: false } });
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

  // Retrieve a single salaryCut by ID
  findOne: async (req, res) => {
    try {
      const data = await SalaryCut.findOne({
        where: { archived: false, id: req.params.id },
      });
      if (data == null)
        return handleFailed(res, 400, "Potongan Gaji tidak ditemukan");

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

  // Update a salaryCut
  update: async (req, res) => {
    try {
      const optionalsalaryCutValidator = salaryCutValidator.fork(
        ["type", "cut"],
        (schema) => schema.optional()
      );
      const { error, value } = optionalsalaryCutValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);

      const data = await SalaryCut.update(
        {
          ...value,
          update_time: moment().locale("id").format("YYYY-MM-DD HH:mm:ss"),
          update_id: req.user.id,
        },
        {
          where: {
            id: req.params.id,
            archived: false,
          },
        }
      );
      if (data[0] == 0)
        return handleFailed(res, 400, "Potongan Gaji tidak ditemukan");

      res.status(200).json({
        status: "sukses",
        message: "Potongan gaji berhasil diperbarui",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
      return;
    }
  },

  // Delete a salaryCut
  delete: async (req, res) => {
    try {
      const data = await SalaryCut.update(
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
        return handleFailed(res, 400, "Potongan Gaji tidak ditemukan");

      res.status(200).json({
        status: "sukses",
        message: "Potongan gaji berhasil dihapus",
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

module.exports = salaryCutController;
