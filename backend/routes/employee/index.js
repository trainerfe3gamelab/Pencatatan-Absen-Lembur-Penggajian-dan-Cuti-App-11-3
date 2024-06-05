const router = require("express").Router();
const { verifyRole } = require("../../middleware/auth");
const attendanceRoutes = require("./attendanceRoutes");
const overtimeRoutes = require("./overtimeRoutes");
const leaveRoutes = require("./leaveRoutes");
const attendanceTimeRoutes = require("./attendanceTimeRoutes");
const userRoutes = require("./userRoutes");

router.use(verifyRole("employee"));
router.use("/attendances", attendanceRoutes);
router.use("/overtimes", overtimeRoutes);
router.use("/leaves", leaveRoutes);
router.use("/attendance-times", attendanceTimeRoutes);
router.use("/users", userRoutes);

module.exports = router;
