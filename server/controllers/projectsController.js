const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

modeule.exports ={
    findAll: function(req, res){
        if (req.user) {
            if (req.user) {
                db.User
                  .find({ _id: req.user._id })
                  .populate({ path: "projects", options: { sort: { 'date': -1 } } })
                  .then(users => {
                    res.json({ projects: users[0].projects });
                  })
                  .catch(err => res.status(422).json(err));
              } else {
                return res.json({ projects: null });
            }
        }
    },
    findById: function(req, res) {
        if (req.user) {
          db.User
            .find({ _id: req.user._id })
            .populate("projects")
            .then(users => {
              const project = users[0].projects.filter(p => p._id.toString() === req.params.id);
              res.json({ project: project[0] });
            })
            .catch(err => res.status(422).json(err));
        } else {
          return res.json({ project: null });
        }
    },
    create: function(req, res) {
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
    update: function(req, res) {
    db.Project
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
        })
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
    db.User.findOneAndUpdate({ _id: req.user._id }, { $pull: { projects: new ObjectId(req.params.id) } }, { new: true })
        .then(() => {
        db.Project
            .findOneAndDelete({ _id: req.params.id })
            .then(dbProject => res.json(dbProject))
            .catch(err => res.status(422).json(err));
        });
    }
};