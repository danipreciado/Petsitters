const express = require('express');
const app = express();
const { connect } = require('./connect');
const config = require('./config');

const { port, secret } = config;

app.set('config', config);
app.use(express.json());

app.listen(port, () => {
  console.info(`App listening on port ${port}`);
});

connect();

