const _ = require('lodash');
const express = require('express');

const router = express.Router();

const User = require('../../models/user');

const auth = require('../../middleware/auth');

// @route POST api/auth
router.post('/', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await user.validPassword(req.body.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
})

router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
  .select('-password')
  .then(user => res.json(user));
})

module.exports = router;