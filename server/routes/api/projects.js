const router = require("express").Router();
const projectsController = require("../../controllers/projectsController");

router.route("/")
  .get(projectsController.findAll)
  .post(projectsController.create);

router.route("/:id")
  .get(projectsController.findById)
  .put(projectsController.update)
  .delete(projectsController.remove);

router.route("/type/:type")
  .get(projectsController.findAll);
  
module.exports = router;
