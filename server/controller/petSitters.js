const PetSitter = require('../models/petSitter');
const City = require('../models/City');

function isEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {

  postPetSitter: async (req, resp, next) => {

    const { cityId, email, name, lastname, cellphone, photoURL, age } = req.body;

    if (!email) {
      return next(400);
    }

    if (!isEmail(email)) {
      return next(400);
    }


    try {

      const city = await City.findOne({ name: cityId });
      console.log(city._id);
      if (!city) {
        return next(400);
      }
      const existingPetSitter = await PetSitter.findOne({ email });

      const petSitter = new PetSitter({
        cityId: city._id,
        name,
        lastname,
        photoURL,
        cellphone,
        email,
        age
      });

      if (existingPetSitter) {
        resp.status(403);
      } else {
        const savedPetSitter = await petSitter.save();
        resp.status(200).json({ _id: savedPetSitter._id, email: savedPetSitter.email, cityId });
      }
    } catch (error) {
      next(error);
    }
  },

  editPetSitter: async (req, resp, next) => {
    try {
      const updatedPetSitter = await PetSitter.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedPetSitter) {
        return res.status(404).json({ message: 'PetSitter not found' });
      }
      res.json(updatedPetSitter);
    } catch (error) {
      next(error);
    }
  },

  deletePetSitter: async (req, resp, next) => {

    try {
      const deletedPetSitter = await PetSitter.findByIdAndDelete(req.params.id);
      if (!deletedPetSitter) {
        return res.status(404).json({ message: 'PetSitter not found' });
      }
      res.json({ message: 'PetSitter deleted successfully' });
    } catch (error) {
      next(error);
    }

  },

  getPetSitters: async (req, resp, next) => {
    console.log('entra aqui');
    try {
      const petSitters = await PetSitter.find();
      resp.json(petSitters);
    } catch (error) {
      next(error);
    }

  },






};