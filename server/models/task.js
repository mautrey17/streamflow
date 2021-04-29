const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  status: { type: String },
  startDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
  assignedUsers: [{ type: String }],
  project: { type: String }
});

const Task = mongoose.model("Task", projectSchema);

module.exports = Task;