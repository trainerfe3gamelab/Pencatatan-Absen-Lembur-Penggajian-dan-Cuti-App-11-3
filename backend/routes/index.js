const router = require("express").Router();

const admin = require("./admin/index");
const employee = require("./employee/index");
const authRoutes = require("./authRoutes");

router.use("/auth", authRoutes);
router.use("/employee", employee);
router.use("/admin", admin);

module.exports = router;
