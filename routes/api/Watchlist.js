const express = require('express');
const router = express.Router();

const Watchlist = require('../../models/Watchlist');

// @route GET api/watchlist
router.get('/', (req, res) => {
  Watchlist.find()
    .sort({ date: 1 })
    .then(movies => res.json(movies))
})

// @route POST api/watchlist
router.post('/', (req, res) => {
  const movie = new Watchlist({
    filmId: req.body.filmId
  });

  movie.save()
    .then(movie => res.json(movie));
})

module.exports = router;