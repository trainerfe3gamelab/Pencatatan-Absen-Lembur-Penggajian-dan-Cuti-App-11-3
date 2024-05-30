const handleFailed = (res, status, message) => {
  res.status(status).json({ status: "gagal", message });
};

module.exports = { handleFailed };
