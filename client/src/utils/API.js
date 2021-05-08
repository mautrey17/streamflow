import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  getAllProjects: function() {
    return axios.post("/api/projects")
  },
  getProjects: function(type) {
    return axios.get("/api/projects/type/" + type);
  },
  saveProject: function(projectData) {
    return axios.post("/api/projects", projectData);
  },
  deleteProject: function(id) {
    return axios.delete("/api/projects/" + id);
  },
  getUsers: function() {
    return axios.get("/api/users");
  },
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  getAllTasks: function() {
    return axios.get("/api/tasks");
  },
  getTasks: function(type) {
    return axios.get("/api/tasks/type/" + type);
  },
  getTask: function(id) {
    return axios.get("/api/tasks/" + id);
  },
  saveTask: function(taskData) {
    return axios.post("/api/tasks", taskData)
  },
  // Gets all books
  getNotes: function() {
    return axios.get("/api/notes");
  },
  // Gets the book with the given id
  getNote: function(id) {
    return axios.get("/api/notes/" + id);
  },
  // Deletes the book with the given id
  deleteNote: function(id) {
    return axios.delete("/api/notes/" + id);
  },
  // Saves a book to the database
  saveNote: function(noteData) {
    return axios.post("/api/notes", noteData)
  },
  // Saves a book to the database
  updateNote: function(id,noteData) {
    return axios.put("/api/notes/"+id, noteData)
  },
  deleteTask: function(id) {
    return axios.delete("/api/tasks/" + id);
  },
};
