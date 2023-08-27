const express = require('express');
const cors = require('cors');
const { connect } = require('./connect');
const createCitiesAndStates = require('./createCitiesAndStates');
const createPetsTypes = require('./createPetsType');
const seedDatabase = require('./seed');
const authMiddleware = require('./middleware/auth');

const petSittersRouter = require('./routes/petsitters');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const reviewsRouter = require('./routes/reviews');

const config = require('./config');
const pkg = require('./package.json');

const { port, secret } = config;
const app = express();

app.set('config', config);
app.set('pkg', pkg);

app.use(cors());
app.use(express.json());
app.use(authMiddleware(secret));

app.use('/login', loginRouter);
app.use('/petsitters', petSittersRouter);
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);

createCitiesAndStates();
createPetsTypes();
seedDatabase();

app.listen(port, () => {
  console.info(`App listening on port ${port}`);
});

connect();
