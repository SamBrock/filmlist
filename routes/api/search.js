const express = require('express');
const axios = require('axios');

const MovieService = require('../../services/TMDbService');

const baseURL = process.env.BASE_URL;
const api_key = process.env.API_KEY;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = req.query.q;

    const url = `/search/movie?api_key=${api_key}&query=${query}`;
    const response = await axios.get(baseURL + url);

    const movies = MovieService.getMovieSearchArrDetails(response.data.results);
    

    res.send(movies.slice(0, 6));
  } catch (error) {
    res.status(400).send(error);
  }
})

module.exports = router;