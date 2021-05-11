import axios from "axios";

export default {
  // Projects
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

  // Users
  getUsers: function() {
    return axios.get("/api/users");
  },
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },

  // Tasks
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
  updateTask: function(id, taskData) {
    return axios.put("/api/tasks/" + id, taskData)
  },
  deleteTask: function(id) {
    return axios.delete("/api/tasks/" + id)
  },


  // Notes
  getNotes: function() {
    return axios.get("/api/notes");
  },
  getNote: function(id) {
    return axios.get("/api/notes/" + id);
  },
  deleteNote: function(id) {
    return axios.delete("/api/notes/" + id);
  },
  saveNote: function(noteData) {
    return axios.post("/api/notes", noteData)
  },
  updateNote: function(id,noteData) {
    return axios.put("/api/notes/"+id, noteData)
  }
};
