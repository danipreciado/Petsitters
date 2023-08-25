const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: String,
  Lastname: String,
  Email: String,
  Cellphone: String,
  Password: String,

});

const User = mongoose.model('User', userSchema);

module.exports = User;