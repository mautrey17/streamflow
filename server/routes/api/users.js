const router = require("express").Router();
const userController = require("../../controllers/userController");

router
  .route("/:id")
  .get(userController.getUser);
  
module.exports = router;