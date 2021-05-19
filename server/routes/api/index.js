const router = require("express").Router();
const bookNotes = require("./notes");
const projectRoutes = require("./projects");
const taskRoutes = require("./tasks");
const userRoutes = require("./users");

router.use("/notes", bookNotes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);

module.exports = router;
