const { Wage, User, Position } = require("../models");
const wageValidator = require("../utils/validator/wageValidator");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const { handleFailed, handleError } = require("../utils/response");
const { createWageReports } = require("../utils/wage");

const wageController = {
  // Create a new wage
  create: async (req, res) => {
    // Validate request body
    const optionalwageValidator = wageValidator.fork(
      ["overtimes", "cuts", "net_salary"],
      (schema) => schema.optional()
    );
    const { error, value } = optionalwageValidator.validate(req.body);
    if (error) return handleFailed(res, 400, error.details[0].message);

    try {
      const wage = await createWageReports(
        value.user_id,
        value.month,
        value.year
      );

      if (!wage) return handleFailed(res, 404, "user_id tidak ditemukan");
      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      const data = await Wage.create({
        ...wage,
        month: value.month,
        year: value.year,
        creation_time: now,
        update_time: now,
        create_id: uuidv4(),
        update_id: uuidv4(),
      });
      res.status(201).json({ status: "sukses", data: data });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve all wage
  findAll: async (req, res) => {
    try {
      let wage = await Wage.findAll({
        where: { archived: false },
        include: [
          {
            model: User,
            as: "user",
            where: { archived: false },
            required: false,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json({ status: "sukses", data: wage });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  findAllForEmployee: async (req, res) => {
    try {
      const wage = await User.findOne({
        where: { id: req.user.id, archived: false },
        include: {
          model: Wage,
          as: "wages",
          where: { archived: false },
          required: false,
        },
        attributes: ["id", "email", "role"],
      });
      res.status(200).json({ status: "sukses", data: wage });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve a single wage by ID
  findOne: async (req, res) => {
    try {
      const wage = await Wage.findOne({
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

      if (!wage) return handleFailed(res, 400, "Data Gaji tidak ditemukan");

      res.status(200).json({ status: "sukses", data: wage });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  findOneForEmployee: async (req, res) => {
    try {
      const wage = await Wage.findOne({
        where: {
          id: req.params.id,
          archived: false,
          user_id: req.user.id,
        },
      });
      if (!wage) return handleFailed(res, 400, "Data Gaji tidak ditemukan");

      res.status(200).json({ status: "sukses", data: wage });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Update a wage
  update: async (req, res) => {
    try {
      // Validate request body
      const optionalwageValidator = wageValidator.fork(
        ["month", "year", "overtimes", "cuts", "net_salary"],
        (schema) => schema.optional()
      );
      const { error, value } = optionalwageValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);
      const updateData = await Wage.update(
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
      if (updateData[0] == 0)
        return handleFailed(res, 400, "Data Gaji gagal diperbarui");

      res.status(200).json({
        status: "sukses",
        message: "Data Gaji berhasil diperbarui.",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Delete a wage
  delete: async (req, res) => {
    try {
      const data = await Wage.update(
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
        return handleFailed(res, 400, "Data Gaji gagal dihapus");

      res.status(200).json({
        status: "sukses",
        message: "Gaji berhasil dihapus",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },
};

module.exports = wageController;
