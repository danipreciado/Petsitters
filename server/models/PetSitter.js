const mongoose = require('mongoose');

const petSitterSchema = new mongoose.Schema({
  cityId: String,
  name: String,
  lastname: String,
  email: String, 
  password: String,
  petType: {
    type: String,
    enum: ['perros', 'gatos', 'serpientes']
  }
  
});

const PetSitter = mongoose.model('PetSitter', petSitterSchema);

module.exports = PetSitter;