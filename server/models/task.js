const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  status: { type: String },
  startDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
  assignedUsers: [{ type: String }],
  project: { type: String },
  urgency: { type: String },
  owner: {
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String },
    id: { type: String }
  }
});

const Task = mongoose.model("Task", projectSchema);

module.exports = Task;