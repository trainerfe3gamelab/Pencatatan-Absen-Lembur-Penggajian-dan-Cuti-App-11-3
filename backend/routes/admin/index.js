const router = require("express").Router();
const { verifyRole } = require("../../middleware/auth");
const positionRoutes = require("./positionRoutes");
const overtimeRoutes = require("./overtimeRoutes");
const attendanceRoutes = require("./attendanceRoutes");
const salaryCutRoutes = require("./salaryCutRoutes");

router.use(verifyRole("admin"));
router.use("/position", positionRoutes);
router.use("/overtimes", overtimeRoutes);
router.use("/attendances", attendanceRoutes);
router.use("/salarycuts", salaryCutRoutes);

module.exports = router;
