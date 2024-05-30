const router = require("express").Router();
const overtimeController = require("../../controllers/overtimeController");

router.get("/", overtimeController.findAll);
router.post("/", overtimeController.create);
router.get("/:id", overtimeController.findOne);
router.put("/:id", overtimeController.update);
router.delete("/:id", overtimeController.delete);

module.exports = router;
