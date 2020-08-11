const express = require('express');
const axios = require('axios');
const config = require('config');
const mongoose = require('mongoose');

const router = express.Router();

const User = require('../../models/user');
const auth = require('../../middleware/auth');

const baseURL = config.get('TMDb.baseURL');
const api_key = config.get('TMDb.api_key');

// @route   GET api/username/watchlist
// @desc    Get user watchlist
// @access  Public
router.get('/:username/watchlist', async (req, res) => {
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

// @route   POST api/username/watchlist
// @desc    Add movie to user watchlist
// @access  Private 
router.post('/:username/watchlist', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });
  user.watchlist.push({ filmId: req.body.filmId });
  await user.save();

  res.sendStatus(200);
})

// @route   DELETE api/username/watchlist
// @desc    Remove movie from user watchlist
// @access  Private 
router.delete('/:username/watchlist', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });
  const index = user.watchlist.map(w => w.filmId).indexOf(req.body.filmId);
  if (index == -1) return res.status(400).send('Failed to delete. Film is not in watchlist.');
  user.watchlist.splice(index, 1);

  await user.save();

  res.sendStatus(200);
})

// @route   POST api/username/ratings
// @desc    Add movie rating to user ratings
// @access  Private 
router.post('/:username/rating', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });
  const ratings = await user.ratings.filter(r => r.filmId != req.body.filmId);
  ratings.push({ filmId: req.body.filmId, rating: req.body.rating });

  user.ratings = ratings;
  await user.save();

  res.sendStatus(200);
})


// @route   GET api/username/ratings/filmId
// @desc    Get user data for ui components for movie
// @access  Private 
router.get('/:username/:filmId', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });

  const userWatchlist = await user.watchlist.find(w => w.filmId == req.params.filmId);
  const userRating = await user.ratings.find(r => r.filmId == req.params.filmId);

  const ui = {
    watchlist: userWatchlist ? true : false,
    rating: userRating ? userRating.rating : 0,
  }

  res.status(200).send(ui);
})

function verifyUserRequest(req) {
  if (req.params.username != req.user.username) return false;
  return true;
}

module.exports = router;