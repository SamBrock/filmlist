const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
  filmId: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Watchlist = mongoose.model('watchlist', WatchlistSchema);