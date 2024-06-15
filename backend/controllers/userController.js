const { User, Position } = require("../models");
const userValidator = require("../utils/validator/userValidator");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const { moveFile, deleteTempFile } = require("../middleware/fileHandler");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { handleFailed, handleError } = require("../utils/response");

const deleteFile = (filePath) => {
  if (
    fs.existsSync(filePath) &&
    !filePath.includes("default-profile-picture.png")
  ) {
    fs.unlinkSync(filePath);
  }
};

const userController = {
  create: async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        deleteTempFile(req);
        return handleFailed(res, 404, "User sudah terdaftar");
      }

      const { error, value } = userValidator.validate(req.body);
      if (error) {
        deleteTempFile(req);
        return handleFailed(res, 400, error.details[0].message);
      }

      // Check if position_id exists in the Position table
      const position = await Position.findOne({
        where: { id: value.position_id, archived: false },
      });
      if (!position) {
        deleteTempFile(req);
        return handleFailed(res, 400, "Position tidak ditemukan");
      }

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

      // Move file to final destination if successful
      moveFile(req, res, () => {
        res.status(201).json({
          status: "sukses",
          data: data,
        });
      });
    } catch (error) {
      deleteTempFile(req);
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  findAll: async (req, res) => {
    try {
      const role = req.query.user || "";
      const whereClause = role
        ? { archived: false, role: role }
        : { archived: false };

      const data = await User.findAll({
        where: whereClause,
        attributes: { exclude: ["password"] },
        include: {
          model: Position,
          as: "position",
          attributes: ["position_name"],
        },
      });

      res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        status: "error",
        message: "Terjadi error pada server",
      });
    }
  },

  findOne: async (req, res) => {
    try {
      const data = await User.findOne({
        where: { archived: false, id: req.params.id },
        include: {
          model: Position,
          as: "position",
          attributes: ["position_name"],
        },
        attributes: { exclude: ["password"] },
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

  findOneForUser: async (req, res) => {
    try {
      const data = await User.findOne({
        where: { archived: false, id: req.user.id },
        include: {
          model: Position,
          as: "position",
          attributes: ["position_name"],
        },
        attributes: { exclude: ["password"] },
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

  update: async (req, res) => {
    try {
      const optionalUserValidator = userValidator.fork(
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
      const { error, value } = optionalUserValidator.validate(req.body);
      if (error) {
        deleteTempFile(req);
        return handleFailed(res, 400, error.details[0].message);
      }

      // Check if email is already used by another user
      if (value.email) {
        const emailUser = await User.findOne({
          where: {
            email: value.email,
            id: { [Op.ne]: req?.params?.id || req.user.id },
          },
        });
        if (emailUser) {
          deleteTempFile(req);
          return handleFailed(
            res,
            400,
            "Email sudah dipakai oleh pengguna lain"
          );
        }
      }

      // Check if position_id exists in the Position table
      if (value.position_id) {
        const position = await Position.findOne({
          where: { id: value.position_id, archived: false },
        });
        if (!position) {
          deleteTempFile(req);
          return handleFailed(res, 400, "Position tidak ditemukan");
        }
      }

      const user = await User.findOne({
        where: { id: req?.params?.id || req.user.id },
      });
      if (req.file) {
        const oldImagePath = path.join(
          __dirname,
          "../public/",
          user.profile_picture
        );
        if (user.profile_picture !== "img/default-profile-picture.png") {
          deleteFile(oldImagePath);
        }
        value.profile_picture = `uploads/users/${req.file.filename}`;
      }

      if (req.user.role == "employee") delete value.position_id;
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
      if (data[0] == 0) {
        deleteTempFile(req);
        return handleFailed(res, 400, "Gagal memperbarui User");
      }

      moveFile(req, res, () => {
        res.status(200).json({
          status: "sukses",
          message: "User berhasil diperbarui",
        });
      });
    } catch (error) {
      deleteTempFile(req);
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },

  delete: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { id: req.params.id, archived: false },
      });
      if (!user) return handleFailed(res, 400, "User tidak ditemukan");

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

      const oldImagePath = path.join(
        __dirname,
        "../public/",
        user.profile_picture
      );
      if (user.profile_picture !== "img/default-profile-picture.png") {
        deleteFile(oldImagePath);
      }

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
