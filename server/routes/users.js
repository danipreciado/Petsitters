const express = require('express');
const usersRouter = express.Router();
const { postUser } = require('../controller/Users.js');


usersRouter.post('/', postUser);

module.exports = usersRouter;