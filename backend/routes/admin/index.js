const router = require("express").Router();
const { verifyRole } = require("../../middleware/auth");
const positionRoutes = require("./positionRoutes");
const overtimeRoutes = require("./overtimeRoutes");
const attendanceRoutes = require("./attendanceRoutes");
const salaryCutRoutes = require("./salaryCutRoutes");
const leaveRoutes = require("./leaveRoutes");
const attendanceTimeRoutes = require("./attendanceTimeRoutes");
const holidayRoutes = require("./holidayRoutes");
const userRoutes = require("./userRoutes");
const wageRoutes = require("./wageRoutes");
const attendanceReportRoutes = require("./attendanceReportRoutes");
const dashboardRoutes = require("./dashboardRoutes");

router.use(verifyRole("admin"));
router.use("/positions", positionRoutes);
router.use("/overtimes", overtimeRoutes);
router.use("/attendances", attendanceRoutes);
router.use("/salarycuts", salaryCutRoutes);
router.use("/leaves", leaveRoutes);
router.use("/attendance-times", attendanceTimeRoutes);
router.use("/holidays", holidayRoutes);
router.use("/users", userRoutes);
router.use("/wages", wageRoutes);
router.use("/attendance-reports", attendanceReportRoutes);
router.use("/dashboards", dashboardRoutes);

module.exports = router;
