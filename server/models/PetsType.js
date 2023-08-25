const mongoose = require('mongoose');

const petsTypeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

const PetsType = mongoose.model('PetsType', petsTypeSchema);

module.exports = PetsType;
