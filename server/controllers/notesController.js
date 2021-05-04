const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

module.exports = {
  findAll: function (req, res) {
      if (req.user) {
        db.Note
          .find({ 
            "$or": 
            [{ 
              "owner.id": req.user._id
            }, {
              "assignedUsers": req.user._id
            }]
        })
          .populate({ path: "notes", options: { sort: 'title' } })
          .then(notes => {
            res.json({ notes: notes });
          })
          .catch(err => res.status(422).json(err));
      } else {
        return res.json({ notes: null });
      }
  },
  findById: function (req, res) {
    if (req.user) {
      db.Note
          .find({ 
            "$or": 
            [{ 
              "owner.id": req.user._id
            }, {
              "assignedUsers": req.user._id
            }]
        })
        .populate("notes")
        .then(notes => {
          const note = notes.filter(p => p._id.toString() === req.params.id);
          res.json({ note: note[0] });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ note: null });
    }
  },
  create: function (req, res) {
    console.log(req)
    db.Note
      .create(req.body)
      .then(dbNote => {
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { notes: dbNote._id } }, { new: true });
      })
      .then((dbUser) => {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Note
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.user._id }, { $pull: { notes: new ObjectId(req.params.id) } }, { new: true })
      .then(() => {
        db.Note
          .findOneAndDelete({ _id: req.params.id })
          .then(dbNote => res.json(dbNote))
          .catch(err => res.status(422).json(err));
      });
  }
};