const router = require("express").Router();
const leaveController = require("../../controllers/leaveController");

router.get("/", leaveController.findAllForEmployee);
router.post("/", leaveController.createForUser);
router.get("/:id", leaveController.findOneForEmployee);
router.put("/:id", leaveController.update);
router.delete("/:id", leaveController.delete);

module.exports = router;
