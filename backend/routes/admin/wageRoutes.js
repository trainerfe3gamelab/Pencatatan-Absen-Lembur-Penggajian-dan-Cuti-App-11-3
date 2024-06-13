const router = require("express").Router();
const wageController = require("../../controllers/wageController");

router.get("/", wageController.findAll);
router.post("/", wageController.create);
router.post("/all", wageController.createAll);
router.get("/:id", wageController.findOne);
router.put("/:id", wageController.update);
router.delete("/", wageController.delete);
router.delete("/:id", wageController.deleteById);

module.exports = router;
