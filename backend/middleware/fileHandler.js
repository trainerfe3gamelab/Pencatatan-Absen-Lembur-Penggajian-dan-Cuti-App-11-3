// middleware/fileHandler.js
const fs = require("fs");
const path = require("path");
const { handleFailed } = require("../utils/response");

const moveFile = (req, res, next) => {
  if (!req.file) return next();

  const tempPath = req.file.path;
  const targetPath = path.join(
    __dirname,
    "../public/uploads/users",
    req.file.filename
  );

  req.file.targetPath = targetPath;

  // Move the file to the final destination
  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      console.log(err.message);
      return handleFailed(res, 500, "Terjadi error pada server");
    }
    next();
  });
};

const deleteTempFile = (req) => {
  if (req.file) {
    const tempPath = req.file.path;
    fs.unlink(tempPath, (err) => {
      if (err) console.log("Failed to delete temp file:", err.message);
    });
  }
};

module.exports = { moveFile, deleteTempFile };
