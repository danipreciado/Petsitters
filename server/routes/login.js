const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/User');

const { secret } = config;


module.exports = (app, nextMain) => {

  app.post('/login', async (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return next(404);
    }

    const passwordMatches = await bcrypt.compare(password, userExists.password);
    const { _id } = userExists;
    if (!passwordMatches) {
      return next(404);
    }

    const token = jwt.sign({
      _id,
      email,
      password,
    }, secret, { expiresIn: '1h' });
    resp.status(200);
    return resp.json({ token });
  });

  return nextMain();
};