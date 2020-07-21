const express = require('express');
const _ = require('lodash');
const Joi = require('@hapi/joi');

const router = express.Router();

const User = require('../../models/user');

// @route   POST api/users
// @desc    Register users
// @access  Public
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ msg: 'User already registered.' });

  user = new User(_.pick(req.body, ['username', 'email', 'password']));

  user.password = await user.generateHash(user.password);

  try {
    await user.save();
  } catch (ex) {
    if(ex.code === 11000) ex.message = 'Username already exists.';
    return res.status(400).send({ msg: ex.message });
  }

  const token = user.generateAuthToken();
  return res.header('x-auth-token', token).send(_.pick(user, ['username', ['email']]));
})

module.exports = router;


// Validate register inputs
function validateUser(user) {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    username: Joi.string().alphanum().min(3).max(32).required(),
    password: Joi.string().min(8).max(32).required(),
  })

  return schema.validate(user);
}