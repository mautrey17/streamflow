const router = require("express").Router();
const bookRoutes = require("./books");
const bookNotes = require("./notes");
const projectRoutes = require("./projects");
const taskRoutes = require("./tasks");
const userRoutes = require("./users");
const avatarRoutes = require("./avatar");
// Book routes
router.use("/books", bookRoutes);
router.use("/notes", bookNotes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);
router.use("/avatar", avatarRoutes)

module.exports = router;
