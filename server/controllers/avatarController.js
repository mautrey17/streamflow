const db = require("../models");

module.exports = {
    update: function(req,res) {
        db.User
        .findOneAndUpdate({_id: req.params.id}, {avatar: req.body})
        .then(data => {
            res.json(data)
        }).catch(err => res.status(422).json(err));

    }
}