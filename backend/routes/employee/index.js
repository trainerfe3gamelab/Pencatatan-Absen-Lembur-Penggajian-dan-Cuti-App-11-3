const router = require("express").Router();
const { verifyRole } = require("../../middleware/auth");
const attendanceRoutes = require("./attendanceRoutes");
const overtimeRoutes = require("./overtimeRoutes");
const leaveRoutes = require("./leaveRoutes");

router.use(verifyRole("employee"));
router.use("/attendances", attendanceRoutes);
router.use("/overtimes", overtimeRoutes);
router.use("/leaves", leaveRoutes);

module.exports = router;
