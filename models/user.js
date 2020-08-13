const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const watchlistSchema = new Schema({
  filmId: {
    type: Number,
    required: true
  }
});

const seenSchema = new Schema({
  filmId: {
    type: Number,
    required: true
  },
  like: Boolean,
  rating: Number
});

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  watchlist: [watchlistSchema],
  seen: [seenSchema]
});

userSchema.methods.generateHash = async function (password) {
  return bcrypt.hash(password, await bcrypt.genSalt(8));
};

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this.id, username: this.username }, config.get('jwtPrivateKey'));
  return token;
};

module.exports = mongoose.model('user', userSchema);
