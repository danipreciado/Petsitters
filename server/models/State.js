const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: String,
  cities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City'
    }
  ]
});

const State = mongoose.model('State', stateSchema);

module.exports = State;