const multer = require("multer");
const moment = require("moment");
const { handleFailed, handleError } = require("../utils/response");

function getCurrentDateTime() {
  return moment().format("YYYYMMDDHHmmss");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/users");
  },
  filename: (req, file, cb) => {
    const dateTime = getCurrentDateTime();
    const originalName = file.originalname;
    const uniqueName = `${dateTime}-${originalName}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    file.isimage = true;
    cb(null, true);
  } else {
    file.isimage = false;
    cb(null, true);
  }
};

const multerHandleError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return handleFailed(res, 400, "Ukuran file melebihi 1MB");
    }
  } else if (err) {
    console.log(err.message);
    return handleFailed(res, 500, "Terjadi error pada server");
  }
  next();
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
});

module.exports = { multerHandleError, upload };
