const router = require("express").Router();
const attendanceReportController = require("../../controllers/attendanceReportController");

router.get("/", attendanceReportController.findAll);
router.post("/", attendanceReportController.create);
router.post("/all", attendanceReportController.createAll);
router.get("/:id", attendanceReportController.findOne);
router.put("/:id", attendanceReportController.update);
router.delete("/:id", attendanceReportController.deleteById);
router.delete("/", attendanceReportController.delete);

module.exports = router;
