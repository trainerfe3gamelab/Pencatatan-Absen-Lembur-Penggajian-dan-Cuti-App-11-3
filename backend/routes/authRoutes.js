const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// attendance Routes
router.post("/login", authController.login);
router.post("/reset-password", authController.resetPassword);
router.post("/reset-password/token", authController.resetPasswordToken);

module.exports = router;
