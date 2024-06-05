const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const { multerHandleError, upload } = require("../../middleware/multer");

// user Routes
router.post(
  "/",
  upload.single("profile_picture"),
  multerHandleError,
  userController.create
);
router.get("/", userController.findAll);
router.put(
  "/:id",
  upload.single("profile_picture"),
  multerHandleError,
  userController.update
);
router.get("/:id", userController.findOne);
router.delete("/:id", userController.delete);

module.exports = router;
