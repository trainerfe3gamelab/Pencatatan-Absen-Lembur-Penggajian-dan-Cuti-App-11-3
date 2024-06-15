const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const { multerHandleError, upload } = require("../../middleware/multer");

// user Routes

router.put(
  "/",
  upload.single("profile_picture"),
  multerHandleError,
  userController.update
);

router.get("/", userController.findOneForUser);

module.exports = router;
