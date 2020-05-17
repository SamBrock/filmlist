const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const movies = require('./routes/api/movies');
const watchlist = require('./routes/api/watchlist');

const app = express();

app.use(express.json());
app.use(cors());

// DB Config
const db = config.get('DB.mongoURI');

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error', err));

// Use routes
app.use('/api/movies', movies);
app.use('/api/watchlist', watchlist);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});