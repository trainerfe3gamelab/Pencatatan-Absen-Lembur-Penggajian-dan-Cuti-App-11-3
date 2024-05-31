const router = require("express").Router();
const { employeeMiddleware } = require("../../middleware/auth");
const attendanceRoutes = require("./attendanceRoutes");
const overtimeRoutes = require("./overtimeRoutes");
const leaveRoutes = require("./leaveRoutes");

router.use(employeeMiddleware);
router.use("/attendances", attendanceRoutes);
router.use("/overtimes", overtimeRoutes);
router.use("/leaves", leaveRoutes);

module.exports = router;
