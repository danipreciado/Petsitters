const express = require('express');
const app = express();
const { connect } = require('./connect');
const routes = require('./routes');
const config = require('./config');
const pkg = require('./package.json');

const { port, secret } = config;

app.set('config', config);
app.set('pkg', pkg);

app.use(express.json());

routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  
});

app.listen(port, () => {
  console.info(`App listening on port ${port}`);
});
connect();

