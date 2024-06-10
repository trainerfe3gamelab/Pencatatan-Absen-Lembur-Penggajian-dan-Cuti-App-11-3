const multer = require("multer");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const { handleFailed } = require("../utils/response");

function getCurrentDateTime() {
  return moment().format("YYYYMMDDHHmmss");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/temp");
  },
  filename: (req, file, cb) => {
    const dateTime = getCurrentDateTime();
    const originalName = file.originalname;
    const uniqueName = `${dateTime}-${originalName}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("hanya menerima file berformat .png, .jpg dan .jpeg"), false);
  }
};

const multerHandleError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return handleFailed(res, 400, "Ukuran file melebihi 1MB");
    }
  } else if (err) {
    console.log(err.message);
    return handleFailed(res, 400, err.message);
  }
  next();
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
});

module.exports = { multerHandleError, upload };
