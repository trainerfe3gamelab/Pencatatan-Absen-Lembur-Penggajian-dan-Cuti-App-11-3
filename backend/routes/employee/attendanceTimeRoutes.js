const express = require("express");
const router = express.Router();
const attendanceTimeController = require("../../controllers/attendanceTimeController");

// attendance time Routes
router.get("/", attendanceTimeController.findAll);
router.get("/:id", attendanceTimeController.findOne);

module.exports = router;
