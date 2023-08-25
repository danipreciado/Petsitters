const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/User');
const PetSitter = require('../models/petSitter'); //ver por que no me acepta PetSitter

const loginRouter = express.Router();

const { secret } = config;

loginRouter.post('/', async (req, resp, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(400);
  }

  const userExists = await User.findOne({ email });

  if (!userExists) {
    const petSitterExists = await PetSitter.findOne({ email });
    if (!petSitterExists) {
      return next(404);
    }

    if (petSitterExists) {
      const passwordMatches = await bcrypt.compare(password, petSitterExists.password);
      if (!passwordMatches) {
        return next(404);
      }

      const { _id } = petSitterExists;
      const token = jwt.sign(
        {
          _id,
          email,
          password,
        },
        secret,
        { expiresIn: '1h' }
      );

      resp.status(200);
      return resp.json({ token, userType: 'petSitter' });
    }
  }

  if (userExists) {
    const passwordMatches = await bcrypt.compare(password, userExists.password);
    if (!passwordMatches) {
      return next(404);
    }

    const { _id } = userExists;
    const token = jwt.sign(
      {
        _id,
        email,
        password,
      },
      secret,
      { expiresIn: '1h' }
    );

    resp.status(200);
    return resp.json({ token, userType: 'user' });
  }

  return next(404);
});

module.exports = loginRouter;