const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/PetSitter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

const petSittersRouter = require('./routes/petSitters');
app.use('/api/petsitters', petSittersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});

