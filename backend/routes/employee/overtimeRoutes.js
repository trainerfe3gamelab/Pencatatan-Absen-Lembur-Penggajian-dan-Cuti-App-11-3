const router = require("express").Router();
const overtimeController = require("../../controllers/overtimeController");

router.get("/", overtimeController.findAllForEmployee);
router.post("/", overtimeController.createForUser);
router.get("/:id", overtimeController.findOneForEmployee);
router.put("/:id", overtimeController.update);
router.delete("/:id", overtimeController.delete);

module.exports = router;
