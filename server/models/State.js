const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: String,
});

const State = mongoose.model('State', stateSchema);

module.exports = State;