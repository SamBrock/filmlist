const express = require('express');
const axios = require('axios');
const config = require('config');
const _ = require('lodash');

const User = require('../../models/user');
const MovieService = require('../../services/MovieService');

const baseURL = config.get('TMDb.baseURL');
const api_key = config.get('TMDb.api_key');

const router = express.Router();

// @route   GET api/movies/username
// @desc    Get movies by user
// @access  Public
router.get('/:username', async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send('User does not exist.');

  
  const random = randomLikesIndex(user.likes.length);
  const randomLikedMovies = _.at(user.likes, random);
  
  let movies = await getRecommendedMovies(randomLikedMovies);
  
  const seen = _.concat(user.likes.map(movie => ({id: movie.filmId})), user.ratings.map(movie => ({id: movie.filmId})));
  
  const test = user.ratings.map(movie => ({id: movie.filmId}));
  // remove seen
  // limit page / counter
  // remove duplicates

  movies = _.differenceBy(movies, seen, 'id');
  
  res.send(movies);
});

// @route   GET api/movies/id
// @desc    Get movie details by id
// @access  Public
router.get('/details/:id', async (req, res) => {
  try {
    const url = `/movie/${req.params.id}?api_key=${api_key}&append_to_response=credits`;
    const response = await axios.get(baseURL + url);

    const movie = MovieService.getMovieDetails(response.data);

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
  
  while (arr.length < 4) {
    const r = Math.floor(Math.random() * max);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
 
  return arr;
}

module.exports = router;