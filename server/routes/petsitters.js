const express = require('express');
const petSittersRouter = express.Router();

const { postPetSitter, editPetSitter, deletePetSitter, getPetSitters, getPetsTypesOfPetSitter, addPetsTypeToPetSitter, deletePetsTypeFromPetSitter, getPetSittersByState, getPetSitter } = require('../controller/petSitters.js');

petSittersRouter.post('/', postPetSitter);

petSittersRouter.put('/:id', editPetSitter);

petSittersRouter.delete('/:id', deletePetSitter);

petSittersRouter.get('/', getPetSitters);

petSittersRouter.get('/:id', getPetSitter);

petSittersRouter.get('/state/:stateId', getPetSittersByState);

petSittersRouter.get('/petstype/:id/', getPetsTypesOfPetSitter);

petSittersRouter.post('/petstype/:id/:petsTypeId', addPetsTypeToPetSitter);

petSittersRouter.delete('/petstype/:id/:petsTypeId', deletePetsTypeFromPetSitter);

module.exports = petSittersRouter;