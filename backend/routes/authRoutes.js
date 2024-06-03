const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyTokenMiddleware } = require("../middleware/auth");

// attendance Routes
router.post("/login", authController.login);
router.post("/logout", verifyTokenMiddleware, authController.logout);
router.post("/reset-password", authController.resetPassword);
router.post("/reset-password/token", authController.resetPasswordToken);

module.exports = router;
