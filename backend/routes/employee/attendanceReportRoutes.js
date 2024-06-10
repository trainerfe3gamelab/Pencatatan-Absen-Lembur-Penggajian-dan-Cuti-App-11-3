const router = require("express").Router();
const attendanceReportController = require("../../controllers/attendanceReportController");

router.get("/", attendanceReportController.findAllForEmployee);
router.get("/:id", attendanceReportController.findOneForEmployee);

module.exports = router;
