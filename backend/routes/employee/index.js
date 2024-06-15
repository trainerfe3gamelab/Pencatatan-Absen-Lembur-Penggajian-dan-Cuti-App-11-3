const router = require("express").Router();
const { verifyRole } = require("../../middleware/auth");
const attendanceRoutes = require("./attendanceRoutes");
const overtimeRoutes = require("./overtimeRoutes");
const leaveRoutes = require("./leaveRoutes");
const attendanceTimeRoutes = require("./attendanceTimeRoutes");
const userRoutes = require("./userRoutes");
const wageRoutes = require("./wageRoutes");
const attendanceReportRoutes = require("./attendanceReportRoutes");
const positionRoutes = require("./positionRoutes");

router.use(verifyRole("employee"));
router.use("/attendances", attendanceRoutes);
router.use("/overtimes", overtimeRoutes);
router.use("/leaves", leaveRoutes);
router.use("/attendance-times", attendanceTimeRoutes);
router.use("/users", userRoutes);
router.use("/wages", wageRoutes);
router.use("/attendance-reports", attendanceReportRoutes);
router.use("/positions", positionRoutes);

module.exports = router;
