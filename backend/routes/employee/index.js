const router = require("express").Router();
const { verifyRole } = require("../../middleware/auth");
const attendanceRoutes = require("./attendanceRoutes");
const overtimeRoutes = require("./overtimeRoutes");

router.use(verifyRole("employee"));
router.use("/attendances", attendanceRoutes);
router.use("/overtimes", overtimeRoutes);

module.exports = router;
