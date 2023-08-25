const mongoose = require('mongoose');

const petSitterSchema = new mongoose.Schema({
  CityId: String,
  Name: String,
  Lastname: String,
  
});

const PetSitter = mongoose.model('PetSitter', petSitterSchema);

module.exports = PetSitter;