const jwt = require("jsonwebtoken");
const { handleFailed } = require("../utils/response");

const verifyTokenMiddleware = async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization)
    return handleFailed(res, 401, "Akses ditolak. Token tidak ditemukan");

  const token = authorization.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.message === "jwt malformed")
      return handleFailed(res, 400, "Akses ditolak");
    handleFailed(res, 400, error.message);
  }
};

const verifyRole = (role) => {
  return (req, res, next) => {
    if (!req.user)
      return handleFailed(res, 401, "Akses ditolak. Token tidak ditemukan");

    if (req.user.role != role)
      return handleFailed(res, 403, `Akses ditolak. Role anda bukan ${role}`);

    next();
  };
};

module.exports = {
  verifyTokenMiddleware,
  verifyRole,
};
