const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

module.exports = {
  findAll: function (req, res) {
      if (req.user) {
        if (req.params.type === "owned") { db.Project
          .find({ "owner.id": req.user._id })
          .sort({dueDate: 1})
          .populate({ path: "projects" })
          .then(projects => {
            res.json({ projects });
          })
          .catch(err => res.status(422).json(err));
        } else if (req.params.type === "assigned") { db.Project
          .find({ "assignedUsers": req.user._id })
          .sort({dueDate: 1})
          .populate({ path: "projects" })
          .then(projects => {
            res.json({ projects });
          })
          .catch(err => res.status(422).json(err));
        } else {
          db.Project
          .find({ 
            "$or": 
            [{ 
              "owner.id": req.user._id
            }, {
              "assignedUsers": req.user._id
            }]
          })
          .sort({dueDate: 1})
          .populate({ path: "projects" })
          .then(projects => {
            res.json({ projects });
          })
          .catch(err => res.status(422).json(err));
        }
      } else {
        return res.json({ projects: null });
      }
  },
  findById: function (req, res) {
    if (req.user) {
      db.Project
          .find({ 
            "$or": 
            [{ 
              "owner.id": req.user._id
            }, {
              "assignedUsers": req.user._id
            }]
        })
        .populate("projects")
        .then(projects => {
          const project = projects.filter(p => p._id.toString() === req.params.id);
          res.json({ project: project[0] });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ project: null });
    }
  },
  create: function (req, res) {
    console.log(req)
    db.Project
      .create(req.body)
      .then(dbProject => {
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { projects: dbProject._id } }, { new: true });
      })
      .then((dbUser) => {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Project
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.user._id }, { $pull: { projects: new ObjectId(req.params.id) } }, { new: true })
      .then(() => {
        db.Project
          .findOneAndDelete({ _id: req.params.id })
          .then(dbProject => res.json(dbProject))
          .catch(err => res.status(422).json(err));
      });
  }
};