const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    if (req.user) {
      db.User
        .find({ _id: req.user._id })
        .populate({ path: "notes", options: { sort: { 'date': -1 } } })
        .then(users => {
          res.json({ notes: users[0].notes });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ notes: null });
    }
  },
  findById: function(req, res) {
    if (req.user) {
      db.User
        .find({ _id: req.user._id })
        .populate("notes")
        .then(users => {
          const note = users[0].notes.filter(b => b._id.toString() === req.params.id);
          res.json({ note: note[0] });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ note: null });
    }
  },
  create: function (req, res) {
    console.log('body',req.body)
    db.Note
      .create(req.body)
      .then(dbNote => {
        console.log('then -> create')
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { notes: dbNote._id } }, { new: true });
      })
      .then((dbUser) => {
        console.log('2nd then -> create')
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