const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
  .get(userController.findAll);

router.route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser);

router.route("/user/:id")
  .get(userController.getOneUser);

module.exports = router;