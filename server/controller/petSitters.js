const PetSitter = require('../models/petSitter');
const City = require('../models/City');
const State = require('../models/State');
const Review = require('../models/Review');
const PetsType = require('../models/PetsType');

function isEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function calculateAverageRating(petSitterId) {
  try {
    const reviews = await Review.find({ petSitterId });

    if (reviews.length === 0) {
      return 0;
    }

    const totalRatings = reviews.reduce((total, review) => total + review.rating, 0);
    const averageRating = totalRatings / reviews.length;

    const roundedAverage = parseFloat(averageRating.toFixed(2));

    return roundedAverage;
  } catch (error) {
    console.error('Error calculating average rating:', error);
    return 0;
  }
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
    try {
      const petSittersWithCities = await PetSitter.find().populate('cityId');
      const petSittersWithAverageRating = await Promise.all(
        petSittersWithCities.map(async (petSitter) => {
          const averageRating = await calculateAverageRating(petSitter._id);
          return {
            ...petSitter.toObject(),
            averageRating,
          };
        })
      );
  
      const petSittersWithFullInfo = await Promise.all(
        petSittersWithAverageRating.map(async (petSitter) => {
          const city = petSitter.cityId;
    
         const state = await State.findOne({ _id: city.stateId });
  
          return {
            ...petSitter,
            city: city.name,
            state: state.name,
          };
        })
      );
  
      resp.json(petSittersWithFullInfo);
    } catch (error) {
      next(error);
    }
  },

  getPetSitter: async (req, resp, next) => {
    const petSitterId = req.params.id; // Assuming your route is '/petsitters/:id'
  
    try {
      const petSitter = await PetSitter.findById(petSitterId).populate('cityId').populate('petsType');
      if (!petSitter) {
        return resp.status(404).json({ message: 'Pet Sitter not found' });
      }
  
      const averageRating = await calculateAverageRating(petSitter._id);
      const city = petSitter.cityId;
      const state = await State.findOne({ _id: city.stateId });
  
      const petSitterWithFullInfo = {
        ...petSitter.toObject(),
        averageRating,
        city: city.name,
        state: state.name,
      };
  
      resp.json(petSitterWithFullInfo);
    } catch (error) {
      next(error);
    }
  },
  


  //API that filters petsitters by state
  //It also includes rating, city name and state name

  getPetSittersByState: async (req, resp, next) => {
    try {
      const petSittersWithCities = await PetSitter.find().populate('cityId');
      const petSittersWithAverageRating = await Promise.all(
        petSittersWithCities.map(async (petSitter) => {
          const averageRating = await calculateAverageRating(petSitter._id);
          return {
            ...petSitter.toObject(),
            averageRating,
          };
        })
      );
  
      const stateIdToFilter = req.params.stateId;
  
      const petSittersFilteredByState = petSittersWithAverageRating.filter(
        (petSitter) => petSitter.cityId.stateId.toString() === stateIdToFilter
      );
  
      const petSittersWithFullInfo = await Promise.all(
        petSittersFilteredByState.map(async (petSitter) => {
          const city = petSitter.cityId;
          const state = await State.findOne({ _id: city.stateId });
          return {
            ...petSitter,
            city: city.name,
            state: state.name,
          };
        })
      );
  
      resp.json(petSittersWithFullInfo);
    } catch (error) {
      next(error);
    }
  },
  
  
  //PetsType

  addPetsTypeToPetSitter: async (req, resp, next) => {
    const { id, petsTypeId } = req.params;

    try {
      const petSitter = await PetSitter.findById(id);
      const petsType = await PetsType.findById(petsTypeId);
      console.log(petsType);

      if (!petSitter || !petsType) {
        return resp.status(404).json({ error: 'PetSitter or PetsType not found' });
      }

      petSitter.petsType.push(petsType);
      await petSitter.save();

      resp.status(200).json(petSitter);
    } catch (error) {
      next(error);
    }
  },
  
  getPetsTypesOfPetSitter: async (req, resp, next) => {
    const { id } = req.params;

    try {
      const petSitter = await PetSitter.findById(id).populate('petsType');
      if (!petSitter) {
        return resp.status(404).json({ error: 'PetSitter not found' });
      }

      resp.status(200).json(petSitter.petsType);
    } catch (error) {
      next(error);
    }
  },

  deletePetsTypeFromPetSitter: async (req, resp, next) => {
    const { id, petsTypeId } = req.params;

    try {
      const petSitter = await PetSitter.findById(id);
      const petsType = await PetsType.findById(petsTypeId);

      if (!petSitter || !petsType) {
        return resp.status(404).json({ error: 'PetSitter or PetsType not found' });
      }

      petSitter.petsTypes.pull(petsType);
      await petSitter.save();

      resp.status(200).json(petSitter);
    } catch (error) {
      next(error);
    }
  },

};