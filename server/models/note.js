const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  note: { type: String },
});

const Note = mongoose.model("Note", projectSchema);

module.exports = Note;