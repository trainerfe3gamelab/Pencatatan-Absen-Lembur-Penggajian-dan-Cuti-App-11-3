const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

// attendance Routes
router.post("/attendances/:attendanceTimeId", attendanceController.create);
router.post("/attendances/in/:attendanceTimeId", attendanceController.in);
router.post("/attendances/out/:attendanceTimeId", attendanceController.out);
router.get("/attendances", attendanceController.findAll);
router.get("/attendances/:id", attendanceController.findOne);
router.put("/attendances/:id", attendanceController.update);
router.delete("/attendances/:id", attendanceController.delete);

module.exports = router;
