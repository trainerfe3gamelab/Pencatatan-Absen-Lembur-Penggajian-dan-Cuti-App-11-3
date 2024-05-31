const express = require("express");
const router = express.Router();
const salaryCutController = require("../../controllers/salaryCutController");

// Salary Cut Routes
router.post("/", salaryCutController.create);
router.get("/", salaryCutController.findAll);
router.put("/:id", salaryCutController.update);
router.get("/:id", salaryCutController.findOne);
router.delete("/:id", salaryCutController.delete);

module.exports = router;
