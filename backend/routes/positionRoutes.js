const express = require("express");
const router = express.Router();
const positionController = require("../controllers/positionController");

// Position Routes
router.post("/positions", positionController.create);
router.get("/positions", positionController.findAll);
router.get("/positions/:id", positionController.findOne);
router.put("/positions/:id", positionController.update);
router.delete("/positions/:id", positionController.delete);

module.exports = router;
