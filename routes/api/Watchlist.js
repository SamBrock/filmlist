const express = require('express');
const router = express.Router();

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
router.post('/:username', auth, async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username });

  user.watchlist.push({ filmId: req.body.filmId });

  user.save()
    .then(movie => {
      res.json(movie);
      console.log(movie);
    });
})

module.exports = router;