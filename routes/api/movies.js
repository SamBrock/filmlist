const express = require('express');
const axios = require('axios');
const config = require('config');

const router = express.Router();

const baseURL = config.get('TMDb.baseURL');
const api_key = config.get('TMDb.api_key');

// @route GET movies
router.get('/', (req, res) => {
  const url = `/movie/503919/recommendations?api_key=${api_key}&language=en-US&page=1`;
  axios.get(baseURL + url)
    .then(result => res.send(result.data))
    .catch(err => res.send(err));
})

// @route GET movie by ID
router.get('/:id', (req, res) => {
  const url = `/movie/${req.params.id}?api_key=${api_key}&append_to_response=credits`;
  axios.get(baseURL + url)
    .then(result => res.send(result.data))
    .catch(err => res.send(err));
})

module.exports = router;