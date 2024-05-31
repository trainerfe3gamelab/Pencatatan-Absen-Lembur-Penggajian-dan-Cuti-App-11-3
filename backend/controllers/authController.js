const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Email atau password salah." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Email atau password salah." });
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
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid user." });
    }

    user.token = null;
    await user.save();

    res.json({ message: "Sukses logout" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login, logout };
