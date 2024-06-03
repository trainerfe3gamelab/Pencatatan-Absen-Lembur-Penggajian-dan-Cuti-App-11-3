const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, EmailVerification } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const resetPasswordValidator = require("../utils/validator/resetPasswordValidator");
const { updateOrCreateToken } = require("../utils/resetPassword");
const { handleFailed } = require("../utils/response");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Email atau password salah." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Email atau password salah." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "et1kAtkQ5eiVzpR6S9QwrSH0ZrJ0zyXioR8gcEES",
      { expiresIn: "24h" }
    );

    user.token = token;
    await user.save();

    // Exclude sensitive fields from the user data
    const {
      password: _,
      token: __,
      creation_time,
      update_time,
      create_id,
      update_id,
      position_id,
      archived,
      ...userData
    } = user.toJSON();

    res.json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(400).json({ error: "Invalid user." });
    }

    user.token = null;
    await user.save();

    res.json({ message: "Sukses logout" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const resetPasswordToken = async (req, res) => {
  try {
    //validasi data
    const optionalresetPasswordValidator = resetPasswordValidator.fork(
      ["token"],
      (schema) => schema.optional()
    );
    const { error, value } = optionalresetPasswordValidator.validate(req.body);
    if (error) return handleFailed(res, 400, error.details[0].message);
    const { email } = value;

    //cek apakah email terdaftar
    const user = await User.findOne({ where: { email, archived: false } });
    if (!user)
      return handleFailed(res, 400, "Email tidak terdaftar pada aplikasi");

    //buat dan kirim token ke email
    const isSuccess = await updateOrCreateToken(email);
    if (!isSuccess) throw new Error("Gagal menambahkan token ke database");
    res.status(200).json({ status: "sukses", pesan: "Token Berhasil dikirim" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    //validasi data
    const { error, value } = resetPasswordValidator.validate(req.body);
    if (error) return handleFailed(res, 400, error.details[0].message);

    //cek token didatabase
    const now = moment.tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
    const token = await EmailVerification.findOne({
      where: {
        email: value.email,
        token: value.token,
        archived: false,
        used: false,
        expired: { [Op.gte]: now },
      },
    });

    //jika token sudah kadaluarsa atau digunakan
    if (!token)
      return handleFailed(res, 400, "Token Sudah Kadaluarsa atau Digunakan");

    //jika token tidak kadaluarsa atau digunakan
    await EmailVerification.update(
      { used: true, update_time: now, update_id: uuidv4() },
      { where: { email: value.email } }
    );
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(value.new_password, salt);
    const data = await User.update(
      { password: newPassword, update_time: now, update_id: uuidv4() },
      { where: { email: value.email } }
    );
    if (data[0] == 0) {
      return res.status(404).json({
        status: "gagal",
        message: "User tidak ditemukan",
      });
    }
    res.status(200).json({
      status: "sukses",
      message: "Password berhasil diperbarui",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

module.exports = { login, logout, resetPasswordToken, resetPassword };
