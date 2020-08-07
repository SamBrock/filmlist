const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const User = require('../../models/user');
const auth = require('../../middleware/auth');

const baseURL = config.get('TMDb.baseURL');
const api_key = config.get('TMDb.api_key');

// @route   GET api/watchlist
// @desc    Get user watchlist
// @access  Public
router.get('/:username', async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send('User does not exist.');

  const userWatchlist = user.watchlist;

  const watchlist = [];

  const requests = userWatchlist.map(user => {
    const url = `/movie/${user.filmId}?api_key=${api_key}`;
    return axios.get(baseURL + url).then(res => {
      watchlist.push({ timestamp: mongoose.Types.ObjectId(user.id).getTimestamp(), movie: res.data });
    });
  });

  Promise.all(requests).then(() => {
    watchlist.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    res.send(watchlist);
  });
})

// @route   POST api/watchlist
// @desc    Add movie to user watchlist
// @access  Private
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