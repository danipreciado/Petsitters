const PetsType = require('./models/PetsType'); 

async function createPetsTypes() {
  try {
    const petsTypeExists = await PetsType.findOne();

    if (!petsTypeExists) {
      const petsTypeData = [
        { description: 'Perros' },
        { description: 'Gatos' },
        { description: 'Serpientes' }
    
      ];

      await PetsType.insertMany(petsTypeData);
      console.log('PetsTypes created successfully');
    } else {
      console.log('PetsTypes already exist');
    }
  } catch (error) {
    console.error('Error creating PetsTypes:', error);
  }
}

module.exports = createPetsTypes;
