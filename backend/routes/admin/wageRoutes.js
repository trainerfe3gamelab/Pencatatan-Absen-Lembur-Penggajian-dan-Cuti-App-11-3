const router = require("express").Router();
const wageController = require("../../controllers/wageController");

router.get("/", wageController.findAll);
router.post("/", wageController.create);
router.get("/:id", wageController.findOne);
router.put("/:id", wageController.update);
router.delete("/:id", wageController.delete);

module.exports = router;
