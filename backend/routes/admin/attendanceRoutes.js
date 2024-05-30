const express = require("express");
const router = express.Router();
const attendanceController = require("../../controllers/attendanceController");

// attendance Routes
router.post("/", attendanceController.create);
router.get("/", attendanceController.findAll);
router.get("/:id", attendanceController.findOne);
router.put("/:id", attendanceController.update);
router.delete("/:id", attendanceController.delete);

module.exports = router;
