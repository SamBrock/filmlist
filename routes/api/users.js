const _ = require('lodash');
const express = require('express');

const router = express.Router();

const User = require('../../models/user');

// @route POST api/users
router.post('/', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['username', 'email', 'password']));
  
  user.password = await user.generateHash(user.password);

  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['name', ['email']]));
})

module.exports = router;