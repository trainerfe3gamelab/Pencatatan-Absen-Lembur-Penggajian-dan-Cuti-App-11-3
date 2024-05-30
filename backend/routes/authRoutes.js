const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyTokenMiddleware } = require("../utils/middleware/auth");

// attendance Routes
router.post("/login", authController.login);
router.post("/logout", verifyTokenMiddleware, authController.logout);

module.exports = router;
