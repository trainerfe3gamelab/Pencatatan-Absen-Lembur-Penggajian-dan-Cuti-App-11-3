const handleFailed = (res, status, message) => {
  res.status(status).json({ status: "gagal", message });
};

const handleError = (res, status, message) => {
  res.status(status).json({ status: "error", message });
};

module.exports = { handleFailed, handleError };
