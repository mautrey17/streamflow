const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

module.exports = {
  findAll: function (req, res) {
      if (req.user) {
        if (req.params.type === "owned") { db.Task
          .find({ "owner.id": req.user._id })
          .populate({ path: "tasks", options: { sort: { 'date': -1 } } })
          .then(tasks => {
            res.json({ tasks });
          })
          .catch(err => res.status(422).json(err));
        } else if (req.params.type === "assigned") { db.Task
          .find({ "assignedUsers": req.user._id })
          .populate({ path: "tasks", options: { sort: { 'date': -1 } } })
          .then(tasks => {
            res.json({ tasks });
          })
          .catch(err => res.status(422).json(err));
        } else {
          db.Task
          .find({})
          .populate({ path: "tasks", options: { sort: { 'date': -1 } } })
          .then(tasks => {
            res.json({ tasks });
          })
          .catch(err => res.status(422).json(err));
        }
      } else {
        return res.json({ tasks: null });
      }
  },
  findById: function (req, res) {
    if (req.user) {
      db.Task
          .find({ 
            "$or": 
            [{ 
              "owner.id": req.user._id
            }, {
              "assignedUsers": req.user._id
            }]
        })
        .populate("tasks")
        .then(tasks => {
          const task = tasks.filter(p => p._id.toString() === req.params.id);
          res.json({ task: task[0] });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ task: null });
    }
  },
  create: function (req, res) {
    console.log(req)
    db.Task
      .create(req.body)
      .then(dbTask => {
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { tasks: dbTask._id } }, { new: true });
      })
      .then((dbUser) => {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Task
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.user._id }, { $pull: { tasks: new ObjectId(req.params.id) } }, { new: true })
      .then(() => {
        db.Task
          .findOneAndDelete({ _id: req.params.id })
          .then(dbTask => res.json(dbTask))
          .catch(err => res.status(422).json(err));
      });
  }
};