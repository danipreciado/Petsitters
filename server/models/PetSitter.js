const mongoose = require('mongoose');

const petSitterSchema = new mongoose.Schema({
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  },
  name: String,
  lastname: String,
  photoURL: String,
  cellphone: Number,
  email: String, 
  age: Number,
  petsType: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PetsType',
  }],
});

const PetSitter = mongoose.model('PetSitter', petSitterSchema);

module.exports = PetSitter;