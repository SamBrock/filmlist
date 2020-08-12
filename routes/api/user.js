const express = require('express');
const axios = require('axios');
const config = require('config');
const mongoose = require('mongoose');

const User = require('../../models/user');
const auth = require('../../middleware/auth');

const baseURL = config.get('TMDb.baseURL');
const api_key = config.get('TMDb.api_key');

const router = express.Router();

// @route   GET api/username/watchlist
// @desc    Get user watchlist
// @access  Public
router.get('/:username/watchlist', async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send('User does not exist.');

  const watchlist = await getMovieData(user.watchlist);

  res.send(watchlist);
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

// @route   GET api/username/ratings
// @desc    Get user ratings
// @access  Public
router.get('/:username/ratings', async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send('User does not exist.');

  const ratings = await getMovieData(user.ratings);

  res.send(ratings);
})

// @route   POST api/username/ratings
// @desc    Add movie rating to user ratings
// @access  Private 
router.post('/:username/ratings', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });
  const ratings = await user.ratings.filter(r => r.filmId != req.body.filmId);
  ratings.push({ filmId: req.body.filmId, rating: req.body.rating });

  // Delete from watchlist after rating
  const index = user.watchlist.map(w => w.filmId).indexOf(req.body.filmId);
  if (index != -1) user.watchlist.splice(index, 1);

  user.ratings = ratings;
  await user.save();

  res.sendStatus(200);
})

// @route   GET api/username/likes
// @desc    Get user likes
// @access  Public
router.get('/:username/likes', async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send('User does not exist.');

  const likes = await getMovieData(user.likes);

  res.send(likes);
})

// @route   POST api/username/likes
// @desc    Add movie to user likes
// @access  Private 
router.post('/:username/likes', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });
  user.likes.push({ filmId: req.body.filmId });
  await user.save();

  res.sendStatus(200);
})

// @route   DELETE api/username/watchlist
// @desc    Remove movie from user watchlist
// @access  Private 
router.delete('/:username/likes', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });
  const index = user.likes.map(l => l.filmId).indexOf(req.body.filmId);
  if (index == -1) return res.status(400).send('Failed to delete. Film is not in watchlist.');
  user.likes.splice(index, 1);

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
  const userRatings = await user.ratings.find(r => r.filmId == req.params.filmId);
  const userLikes = await user.likes.find(l => l.filmId == req.params.filmId);

  const ui = {
    watchlist: userWatchlist ? true : false,
    rating: userRatings ? userRatings.rating : 0,
    like: userLikes ? true : false
  }

  res.status(200).send(ui);
})

async function getMovieData(userArr) {
  const arr = [];

  const requests = userArr.map(async user => {
    const url = `/movie/${user.filmId}?api_key=${api_key}`;
    const response = await axios.get(baseURL + url);

    if( user.rating ) return arr.push({ timestamp: mongoose.Types.ObjectId(user.id).getTimestamp(), movie: response.data, rating: user.rating ? user.rating : null });
    return arr.push({ timestamp: mongoose.Types.ObjectId(user.id).getTimestamp(), movie: response.data });
  });

  await Promise.all(requests);

  arr.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return arr;
}

function verifyUserRequest(req) {
  if (req.params.username != req.user.username) return false;
  return true;
}

module.exports = router;