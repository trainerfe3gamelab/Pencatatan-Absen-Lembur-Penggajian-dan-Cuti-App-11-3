const router = require("express").Router();
const { adminMiddleware } = require("../../middleware/auth");
const positionRoutes = require("./positionRoutes");
const overtimeRoutes = require("./overtimeRoutes");
const attendanceRoutes = require("./attendanceRoutes");
const salaryCutRoutes = require("./salaryCutRoutes");
const leaveRoutes = require("./leaveRoutes");

router.use(adminMiddleware);
router.use("/position", positionRoutes);
router.use("/overtimes", overtimeRoutes);
router.use("/attendances", attendanceRoutes);
router.use("/salarycuts", salaryCutRoutes);
router.use("/leaves", leaveRoutes);

module.exports = router;
