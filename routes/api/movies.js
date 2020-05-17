const express = require('express');
const axios = require('axios');
const config = require('config');

const router = express.Router();

const baseURL = config.get('TMDb.baseURL');
const api_key = config.get('TMDb.api_key');

router.get('/', (req, res) => {
  const url = `/movie/531428/recommendations?api_key=${api_key}&language=en-US&page=1`;
  axios.get(baseURL + url)
    .then(result => res.send(result.data))
    .catch(err => res.send(err));
  // res.send(baseURL + url);
})

module.exports = router;