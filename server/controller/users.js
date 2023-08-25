const bcrypt = require('bcrypt');
const User = require('../models/User');

function isEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  
  postUser: async (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }

    if (!isEmail(email)) {
      return next(400);
    }

    if (password.length < 4) {
      return next(400);
    }

    const user = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      cellphone: req.body.cellphone,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        resp.status(403).json({ error: 'Usuario ya registrado' });
      } else {
        const savedUser = await user.save();
        resp.status(200);
        resp.json({ _id: savedUser._id, email: savedUser.email, role: savedUser.role });
      }
    } catch (error) {
      resp.status(404).send('Error al crear usuario');
      next(error);
    }
  },

};