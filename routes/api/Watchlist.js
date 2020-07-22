const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

// const Watchlist = require('../../models/watchlist');
const User = require('../../models/user');

const auth = require('../../middleware/auth');

// @route GET api/watchlist
// router.get('/', (req, res) => {
//   Watchlist.find()
//     .sort({ date: 1 })
//     .then(movies => res.json(movies))
// })

// @route POST api/watchlist
router.post('/', auth, async (req, res) => {
  const token = req.header('x-auth-token');
  const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
  const userId = decoded.id;
  const user = await User.findById(userId);

  user.watchlist.push({ filmId: req.body.filmId });

  user.save()
    .then(() => {
      res.status(200);
    });
})

module.exports = router;