const router = require("express").Router();
const { verifyTokenMiddleware } = require("../middleware/auth");

const admin = require("./admin/index");
const employee = require("./employee/index");
const authRoutes = require("./authRoutes");

router.use("/auth", authRoutes);
router.use("/employee", verifyTokenMiddleware, employee);
router.use("/admin", verifyTokenMiddleware, admin);

module.exports = router;
