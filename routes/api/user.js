const express = require('express');
const _ = require('lodash');

const User = require('../../models/user');
const auth = require('../../middleware/auth');
const MovieService = require('../../services/MovieService');

const router = express.Router();

// @route   GET api/username
// @desc    Get recommended movies for user
// @access  Public
router.get('/:username', async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send('User does not exist.');

  const { page, limit } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const likes = user.seen.filter(s => s.like === true);
  if(likes.length < 3 ) return res.status(400).send({ id: 'MOVIES_ERROR', msg: 'No liked movies.' })

  const randomNums = randomLikesIndex(likes.length);
  const randomLikedMovies = _.at(likes, randomNums);

  let movies = await MovieService.getTMDbRecommendedMovies(randomLikedMovies);
  movies = _.differenceBy(movies, user.seen.map(s => ({ id: s.filmId })), 'id');

  movies = movies.slice(startIndex, endIndex);

  movies = await MovieService.getMovieArrDetails(movies);

  res.send(movies);
});

// @route   GET api/username/watchlist
// @desc    Get user watchlist
// @access  Public
router.get('/:username/watchlist', async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send('User does not exist.');

  const { page, limit } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const userWatchlist = user.watchlist.reverse().slice(startIndex, endIndex);
  const tmdbData = await MovieService.getTMDbData(userWatchlist);
  const watchlist = await MovieService.getMovieArrDetails(tmdbData);

  res.send(watchlist);
})

// @route   GET api/username/seen
// @desc    Get user seen
// @access  Public
router.get('/:username/seen', async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send('User does not exist.');

  const { page, limit } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const userSeen = user.seen.reverse().slice(startIndex, endIndex);
  const tmdbData = await MovieService.getTMDbData(userSeen);
  const seen = await MovieService.getMovieArrDetails(tmdbData);

  res.send(seen);
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

  res.status(200).send({ id: 'ADD', msg: `'${req.body.title}' was added to your watchlist.` });
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

  res.status(200).send({ id: 'DELETE', msg: `'${req.body.title}' was removed from your watchlist.` });
})

// @route   POST api/username/ratings
// @desc    Add movie rating to user ratings
// @access  Private 
router.post('/:username/ratings', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });
  let index = user.seen.map(s => s.filmId).indexOf(req.body.filmId);

  index != -1 ? user.seen[index].rating = req.body.rating : user.seen.push({ filmId: req.body.filmId, rating: req.body.rating });

  // Delete from watchlist after rating
  index = user.watchlist.map(w => w.filmId).indexOf(req.body.filmId);
  if (index != -1) user.watchlist.splice(index, 1);

  await user.save();

  res.sendStatus(200);
})

// @route   POST api/username/likes
// @desc    Add movie to user likes
// @access  Private 
router.post('/:username/likes', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });
  const index = user.seen.map(s => s.filmId).indexOf(req.body.filmId);

  index != -1 ? user.seen[index].like = true : user.seen.push({ filmId: req.body.filmId, like: true });

  await user.save();

  res.sendStatus(200);
})

// @route   DELETE api/username/likes
// @desc    Remove movie from user likes
// @access  Private 
router.delete('/:username/likes', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });
  const index = user.seen.map(l => l.filmId).indexOf(req.body.filmId);
  if (index == -1) return res.status(400).send('Failed to delete. Film is already not liked.');

  user.seen[index].like = false;

  await user.save();

  res.sendStatus(200);
})


// @route   POST api/username/seen
// @desc    Add movie to user seen
// @access  Private 
router.post('/:username/seen', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });

  const index = user.seen.map(s => s.filmId).indexOf(req.body.filmId);
  if (index != -1) return res.status(400).send('Film already in seen');

  user.seen.push({ filmId: req.body.filmId });

  await user.save();

  res.status(200).send({ id: 'ADD', msg: `'${req.body.title}' was added to your seen.` });
})

// @route   DELETE api/username/seen
// @desc    Remove movie from user seen
// @access  Private 
router.delete('/:username/seen', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });
  const index = user.seen.map(s => s.filmId).indexOf(req.body.filmId);
  if (index == -1) return res.status(400).send('Failed to delete. Film is not in seen.');
  user.seen.splice(index, 1);

  await user.save();

  res.status(200).send({ id: 'DELETE', msg: `'${req.body.title}' was removed from your seen.` });
})

// @route   GET api/username/not-interested
// @desc    Get user not interested
// @access  Public
router.get('/:username/not-interested', async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send('User does not exist.');

  const notInterested = await getMovieData(user.notInterested);

  res.send(notInterested);
})

// @route   POST api/username/not-interested
// @desc    Add movie to user not interested
// @access  Private 
router.post('/:username/not-interested', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });

  const index = user.notInterested.map(n => n.filmId).indexOf(req.body.filmId);
  if (index != -1) return res.status(400).send('Film already in seen');

  user.notInterested.push({ filmId: req.body.filmId });

  await user.save();

  res.status(200).send({ id: 'ADD', msg: `'${req.body.title}' was added to your not interested.` });
})

// @route   DELETE api/username/seen
// @desc    Remove movie from user seen
// @access  Private 
router.delete('/:username/not-interested', auth, async (req, res) => {
  const verifyUser = verifyUserRequest(req);
  if (!verifyUser) return res.status(403).send('Forbidden. Not autorized as that user.');

  const user = await User.findOne({ username: req.params.username });
  const index = user.notInterested.map(n => n.filmId).indexOf(req.body.filmId);
  if (index == -1) return res.status(400).send('Failed to delete. Film is not in seen.');
  user.notInterested.splice(index, 1);

  await user.save();

  res.status(200).send({ id: 'DELETE', msg: `'${req.body.title}' was removed from your not interested.` });
})

function verifyUserRequest(req) {
  if (req.params.username != req.user.username) return false;
  return true;
}

function randomLikesIndex(max) {
  const arr = [];

  while (arr.length < max) {
    const r = Math.floor(Math.random() * max);
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}

module.exports = router;