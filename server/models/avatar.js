const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
  top: String,
  accessories: String,
  hairColor: String,
  facialHair: String,
  clothes: String,
  eyes: String,
  eyeBrow: String,
  mouth: String,
  skin: String
});
​
module.exports = mongoose.model('Avatar', avatarSchema);