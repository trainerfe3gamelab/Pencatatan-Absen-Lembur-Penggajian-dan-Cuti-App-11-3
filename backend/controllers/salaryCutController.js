const { SalaryCut } = require("../models"); // Adjust the path as necessary to your models' index.js
const salaryCutValidator = require("../utils/validator/salaryCutValidator");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const { handleFailed, handleError } = require("../utils/response");

const salaryCutController = {
  // Create a new Salary Cut
  create: async (req, res) => {
    try {
      const { error, value } = salaryCutValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);

      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      const data = await SalaryCut.create({
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

  // Retrieve all salaryCuts
  findAll: async (req, res) => {
    try {
      const data = await SalaryCut.findAll({ where: { archived: false } });
      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve a single salaryCut by ID
  findOne: async (req, res) => {
    try {
      const data = await SalaryCut.findOne({
        where: { archived: false, id: req.params.id },
      });
      if (data == null)
        return handleFailed(res, 404, "Potongan Gaji tidak ditemukan");

      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
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
        return handleFailed(res, 404, "Potongan Gaji tidak ditemukan");

      res.status(200).json({
        status: "sukses",
        message: "Potongan gaji berhasil diperbarui",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
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
        return handleFailed(res, 404, "Potongan Gaji tidak ditemukan");

      res.status(200).json({
        status: "sukses",
        message: "Potongan gaji berhasil dihapus",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },
};

module.exports = salaryCutController;
