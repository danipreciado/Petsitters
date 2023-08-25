const express = require('express');
const petSittersRouter = express.Router();

const { postPetSitter, editPetSitter, deletePetSitter, getPetSitters } = require('../controller/petSitters.js');

petSittersRouter.post('/', postPetSitter);

petSittersRouter.put('/:id', editPetSitter);

petSittersRouter.delete('/:id', deletePetSitter);

petSittersRouter.get('/', getPetSitters);

module.exports = petSittersRouter;