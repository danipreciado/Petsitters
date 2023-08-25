const express = require('express');
const { connect } = require('./connect');
const createCitiesAndStates = require('./createCitiesAndStates');
const authMiddleware = require('./middleware/auth');

const petSittersRouter = require('./routes/petsitters');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

const config = require('./config');
const pkg = require('./package.json');

const { port, secret } = config;
const app = express();

app.set('config', config);
app.set('pkg', pkg);

app.use(express.json());
app.use(authMiddleware(secret));

app.use('/login', loginRouter);
app.use('/petsitters', petSittersRouter);
app.use('/users', usersRouter);

createCitiesAndStates();
app.listen(port, () => {
  console.info(`App listening on port ${port}`);
});

connect();
