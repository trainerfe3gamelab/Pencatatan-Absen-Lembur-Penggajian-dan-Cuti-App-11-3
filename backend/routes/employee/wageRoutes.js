const router = require("express").Router();
const wageController = require("../../controllers/wageController");

router.get("/", wageController.findAllForEmployee);

module.exports = router;
