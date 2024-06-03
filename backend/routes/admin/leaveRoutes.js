const router = require("express").Router();
const leaveController = require("../../controllers/leaveController");

router.get("/", leaveController.findAll);
router.post("/", leaveController.create);
router.get("/:id", leaveController.findOne);
router.put("/:id", leaveController.update);
router.delete("/:id", leaveController.delete);

module.exports = router;
