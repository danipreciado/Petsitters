const City = require('./models/City');
const State = require('./models/State');

async function createCitiesAndStates() {
  try {
    const stateExists = await State.findOne();
    if (!stateExists) {
      const stateData = [
        { name: 'Sonora' },
        { name: 'Sinaloa' },
        
      ];

      const states = await State.insertMany(stateData);

      const cityData = [
        { stateId: states[0]._id, name: 'Cd Obregon' },
        { stateId: states[0]._id, name: 'Hermosillo' },
        { stateId: states[1]._id, name: 'Los Mochis' },

      ];

      await City.insertMany(cityData);
      console.log('Cities and states created successfully');
    } else {
      console.log('Cities and states already exist');
    }
  } catch (error) {
    console.error('Error creating cities and states:', error);
  }
}

module.exports = createCitiesAndStates;
