const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyTokenMiddleware = async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.status(401).send({
      status: "failed",
      error: "Akses ditolak. Token tidak ditemukan",
    });
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(
      token,
      "et1kAtkQ5eiVzpR6S9QwrSH0ZrJ0zyXioR8gcEES"
    );
    req.user = decoded;
    next();
  } catch (error) {
    if (error.message === "jwt malformed") {
      return res
        .status(400)
        .send({ status: "failed", error: "Akses ditolak." });
    }
    res.status(400).send({ status: "failed", error: error.message });
  }
};

const verifyRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({
        status: "failed",
        error: "Akses ditolak. Token tidak ditemukan",
      });
    } else {
      if (req.user.role != role) {
        return res.status(403).send({
          status: "failed",
          error: `Akses ditolak. Role anda bukam ${role}`,
        });
      } else {
        next();
      }
    }
  };
};

module.exports = {
  verifyTokenMiddleware,
  verifyRole,
};
