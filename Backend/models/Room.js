
// models/Room.js
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  availability: Boolean,
  image:String,
});

module.exports = mongoose.model('Room', RoomSchema);
