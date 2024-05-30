const express = require("express");
const router = express.Router();
const attendanceController = require("../../controllers/attendanceController");

// attendance Routes
router.post("/in", attendanceController.in);
router.post("/out", attendanceController.out);
router.get("/", attendanceController.findAllForEmployee);
router.get("/:id", attendanceController.findOneForEmployee);

module.exports = router;
