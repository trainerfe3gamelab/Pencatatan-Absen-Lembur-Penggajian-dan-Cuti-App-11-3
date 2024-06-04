const express = require("express");
const router = express.Router();
const holidayController = require("../../controllers/holidayController");

// holiday Routes
router.post("/", holidayController.create);
router.get("/", holidayController.findAll);
router.put("/:id", holidayController.update);
router.get("/:id", holidayController.findOne);
router.delete("/:id", holidayController.delete);

module.exports = router;
