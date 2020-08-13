const express = require('express');
const axios = require('axios');
const config = require('config');
const _ = require('lodash');

const User = require('../../models/user');
const MovieService = require('../../services/MovieService');
const user = require('../../middleware/user');


const baseURL = config.get('TMDb.baseURL');
const api_key = config.get('TMDb.api_key');

const router = express.Router();

// @route   GET api/movies/username
// @desc    Get movies by user
// @access  Public
router.get('/:username', async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send('User does not exist.');

  const likes = user.seen.filter(s => s.like === true);

  const randomNums = randomLikesIndex(likes.length);
  const randomLikedMovies = _.at(likes, randomNums);

  let movies = await getRecommendedMovies(randomLikedMovies);
  movies = _.differenceBy(movies, user.seen.map(s => ({ id: s.filmId })), 'id');

  res.send(movies);
});

// @route   GET api/movies/id
// @desc    Get movie details by id
// @access  Public
router.get('/details/:id', user, async (req, res) => {
  try {
    const url = `/movie/${req.params.id}?api_key=${api_key}&append_to_response=credits`;
    const response = await axios.get(baseURL + url);

    const movie = MovieService.getMovieDetails(response.data);

    if (req.user) {
      let user = await User.findOne({ username: req.user.username });
      
      const index1 = user.watchlist.map(w => w.filmId).indexOf(req.params.id);
      if (index1 != -1) movie.watchlist = true;
      
      const index2 = user.seen.map(s => s.filmId).indexOf(req.params.id);
      if (index2 != -1) {
        movie.rating = user.seen[index2].rating ? user.seen[index2].rating : 0;
        movie.like = user.seen[index2].like ? true : false;
      }
    }

    res.send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

async function getRecommendedMovies(userArr) {
  let arr = [];

  const requests = userArr.map(async user => {
    const url = `/movie/${user.filmId}/recommendations?api_key=${api_key}`;
    const response = await axios.get(baseURL + url);

    const movie = await MovieService.getMovieArrDetails(response.data.results);

    return arr.push(movie);
  });

  await Promise.all(requests);

  arr = _.flatten(arr);

  return arr;
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