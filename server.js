const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const auth = require('./routes/api/auth');
const movies = require('./routes/api/movies');
const search = require('./routes/api/search');
const user = require('./routes/api/user');

const app = express();

app.use(express.json());
app.use(cors());

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

// DB Config
const db = config.get('DB.mongoURI');

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error', err));

// Use routes
app.use('/api/auth', auth);
app.use('/api/movies', movies);
app.use('/api/search', search);
app.use('/api', user);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});