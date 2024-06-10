const router = require("express").Router();
const attendanceReportController = require("../../controllers/attendanceReportController");

router.get("/", attendanceReportController.findAll);
router.post("/", attendanceReportController.create);
router.get("/:id", attendanceReportController.findOne);
router.put("/:id", attendanceReportController.update);
router.delete("/:id", attendanceReportController.delete);

module.exports = router;
