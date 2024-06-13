const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/dashboardController");

// dashboard Routes
router.get("/", dashboardController.findAll);

module.exports = router;
