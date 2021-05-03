const router = require("express").Router();
const tasksController = require("../../controllers/tasksController");

router.route("/")
  .get(tasksController.findAll)
  .post(tasksController.create);

router.route("/:id")
  .get(tasksController.findById)
  .put(tasksController.update)
  .delete(tasksController.remove);

router.route("/type/:type")
  .get(tasksController.findAll);
  
module.exports = router;
