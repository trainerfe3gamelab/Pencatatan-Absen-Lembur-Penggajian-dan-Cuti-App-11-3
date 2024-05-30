const router = require("express").Router();
const { employeeMiddleware } = require("../../utils/middleware/auth");
const attendanceRoutes = require("./attendanceRoutes");
const overtimeRoutes = require("./overtimeRoutes");

router.use(employeeMiddleware);
router.use("/attendances", attendanceRoutes);
router.use("/overtimes", overtimeRoutes);

module.exports = router;
