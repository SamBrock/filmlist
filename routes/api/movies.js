const express = require('express');
const axios = require('axios');
const config = require('config');

const MovieService = require('../../services/MovieService');

const router = express.Router();

const baseURL = config.get('TMDb.baseURL');
const api_key = config.get('TMDb.api_key');

// @route GET movies
router.get('/', (req, res) => {
  const url = `/movie/27205/recommendations?api_key=${api_key}&language=en-US&page=1`;
  axios.get(baseURL + url)
    .then(result => res.send(result.data))
    .catch(err => res.send(err));
});

// @route GET movie by ID
router.get('/:id', async (req, res) => {
  try {
    const url = `/movie/${req.params.id}?api_key=${api_key}&append_to_response=credits`;
    const result = await axios.get(baseURL + url);

    const movie = MovieService.getMovieDetails(result.data);

    res.send(movie);
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = router;