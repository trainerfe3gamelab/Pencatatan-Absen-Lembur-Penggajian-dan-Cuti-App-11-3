const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyTokenMiddleware = async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.status(401).send({ message: "Akses ditolak." });
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(
      token,
      "et1kAtkQ5eiVzpR6S9QwrSH0ZrJ0zyXioR8gcEES"
    );
    req.user = decoded;

    const user = await User.findByPk(req.user.id);
    if (!user || user.token !== token) {
      return res.status(403).send({ message: "Akses ditolak." });
    }
    next();
  } catch (error) {
    if (error.message === "jwt malformed") {
      return res.status(400).send({ message: "Akses ditolak." });
    }
    res.status(400).send({ message: error.message });
  }
};

const adminMiddleware = async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.status(401).send({ message: "Akses ditolak." });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      token,
      "et1kAtkQ5eiVzpR6S9QwrSH0ZrJ0zyXioR8gcEES"
    );
    req.user = decoded;

    const user = await User.findByPk(req.user.id);
    if (!user || user.token !== token) {
      return res.status(403).send({ message: "Akses ditolak." });
    } else if (user.role !== "admin") {
      return res
        .status(403)
        .send({ message: "Akses ditolak, anda bukan admin." });
    }
    next();
  } catch (error) {
    if (error.message === "jwt malformed") {
      return res.status(400).send({ message: "Akses ditolak" });
    }
    res.status(400).send({ message: error.message });
  }
};

const employeeMiddleware = async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.status(401).send({ message: "Akses ditolak." });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      token,
      "et1kAtkQ5eiVzpR6S9QwrSH0ZrJ0zyXioR8gcEES"
    );
    if (!decoded) {
      return res.status(401).send({ message: "Akses ditolak." });
    }
    req.user = decoded;

    const user = await User.findByPk(req.user.id);
    if (!user || user.token !== token) {
      return res.status(403).send({ message: "Akses ditolak." });
    } else if (user.role !== "employee") {
      return res
        .status(403)
        .send({ message: "Akses ditolak, anda bukan karyawan." });
    }
    next();
  } catch (error) {
    if (error.message === "jwt malformed") {
      return res.status(400).send({ message: "Akses ditolak." });
    }
    res.status(400).send({ message: error.message });
  }
};

module.exports = { adminMiddleware, employeeMiddleware, verifyTokenMiddleware };
