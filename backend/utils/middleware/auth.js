const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const verifyTokenMiddleware = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(401).send({ error: "Akses ditolak." });
  }

  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(
      token,
      "et1kAtkQ5eiVzpR6S9QwrSH0ZrJ0zyXioR8gcEES"
    );
    req.user = decoded;

    const user = await User.findByPk(req.user.id);
    if (!user || user.token !== token) {
      return res.status(403).send({ error: "Akses ditolak." });
    }
    next();
  } catch (error) {
    if (error.message === "jwt malformed") {
      return res.status(400).send({ error: "Akses ditolak." });
    }
    res.status(400).send({ error: error.message });
  }
};

const adminMiddleware = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(401).send({ error: "Akses ditolak." });
  }

  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      token,
      "et1kAtkQ5eiVzpR6S9QwrSH0ZrJ0zyXioR8gcEES"
    );
    req.user = decoded;

    const user = await User.findByPk(req.user.id);
    if (!user || user.token !== token) {
      return res.status(403).send({ error: "Akses ditolak." });
    } else if (user.role !== "admin") {
      return res
        .status(403)
        .send({ error: "Akses ditolak, anda bukan admin." });
    }
    next();
  } catch (error) {
    if (error.message === "jwt malformed") {
      return res.status(400).send({ error: "Akses ditolak" });
    }
    res.status(400).send({ error: error.message });
  }
};

const employeeMiddleware = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(401).send({ error: "Akses ditolak." });
  }

  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      token,
      "et1kAtkQ5eiVzpR6S9QwrSH0ZrJ0zyXioR8gcEES"
    );
    if (!decoded) {
      return res.status(401).send({ error: "Akses ditolak." });
    }
    req.user = decoded;

    const user = await User.findByPk(req.user.id);
    if (!user || user.token !== token) {
      return res.status(403).send({ error: "Akses ditolak." });
    } else if (user.role !== "employee") {
      return res
        .status(403)
        .send({ error: "Akses ditolak, anda bukan karyawan." });
    }
    next();
  } catch (error) {
    if (error.message === "jwt malformed") {
      return res.status(400).send({ error: "Akses ditolak." });
    }
    res.status(400).send({ error: error.message });
  }
};

module.exports = { adminMiddleware, employeeMiddleware, verifyTokenMiddleware };
