const express = require("express");
const router = express.Router();
const positionController = require("../../controllers/positionController");

// Position Routes
router.get("/", positionController.findAll);

module.exports = router;
