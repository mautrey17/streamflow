const router = require("express").Router();
const avatarController = require("../../controllers/avatarController");

//Match api/avatar

router.route("/:id")
.update(avatarController.update);

module.exports = router;