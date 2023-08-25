const mongoose = require('mongoose');
const config = require('./config');


const { dbUrl } = config;

async function connect() {
  
  try {
    await mongoose.connect(dbUrl);
    console.log('db connected succesfully');
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
}

module.exports = { connect };