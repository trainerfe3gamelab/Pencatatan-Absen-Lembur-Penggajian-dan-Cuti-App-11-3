const { User } = require("../models"); // Adjust the path as necessary to your models' index.js
const userValidator = require("../utils/validator/userValidator");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const { handleFailed, handleError } = require("../utils/response");
const path = require("path");

const userController = {
  // Create a new user
  create: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
      });
      if (user) return handleFailed(res, 404, "User sudah terdaftar");

      const { error, value } = userValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);

      if (req.file)
        value.profile_picture = `uploads/users/${req.file.filename}`;

      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      const data = await User.create({
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

  // Retrieve all users
  findAll: async (req, res) => {
    try {
      const data = await User.findAll({ where: { archived: false } });
      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Retrieve a single user by ID
  findOne: async (req, res) => {
    try {
      const data = await User.findOne({
        where: { archived: false, id: req.params.id },
      });
      if (data == null) return handleFailed(res, 404, "User tidak ditemukan");

      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Update a user
  update: async (req, res) => {
    try {
      const optionaluserValidator = userValidator.fork(
        [
          "email",
          "password",
          "role",
          "gender",
          "name",
          "address",
          "phone_number",
          "position_id",
        ],
        (schema) => schema.optional()
      );
      const { error, value } = optionaluserValidator.validate(req.body);
      if (error) return handleFailed(res, 400, error.details[0].message);

      if (req.file)
        value.profile_picture = `uploads/users/${req.file.filename}`;
      console.log(req.user.role);
      const data = await User.update(
        {
          ...value,
          role: req.user.role == "employee" ? req.user.role : value.role,
          update_time: moment()
            .tz("Asia/Jakarta")
            .format("YYYY-MM-DD HH:mm:ss"),
          update_id: uuidv4(),
        },
        {
          where: {
            id: req.user.role == "employee" ? req.user.id : req.params.id,
            archived: false,
          },
          individualHooks: true,
        }
      );
      if (data[0] == 0) return handleFailed(res, 400, "Gagal memperbarui User");

      res.status(200).json({
        status: "sukses",
        message: "User berhasil diperbarui",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  // Delete a user
  delete: async (req, res) => {
    try {
      const data = await User.update(
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
      if (data[0] == 0) return handleFailed(res, 400, "Gagal memperbarui User");

      res.status(200).json({
        status: "sukses",
        message: "User berhasil dihapus",
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },
};

module.exports = userController;
