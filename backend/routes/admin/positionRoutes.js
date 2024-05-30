const express = require("express");
const router = express.Router();
const positionController = require("../../controllers/positionController");

// Position Routes
router.post("/", positionController.create);
router.get("/", positionController.findAll);
router.put("/:id", positionController.update);
router.get("/:id", positionController.findOne);
router.delete("/:id", positionController.delete);

module.exports = router;
