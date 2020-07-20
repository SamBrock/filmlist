import { combineReducers } from 'redux';

import authReducer from './auth';
import errorReducer from './error';
import moviesReducer from './movies';
import movieReducer from './movie';
import loadingBarReducer from './loadingBar';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  movies: moviesReducer,
  movie: movieReducer,
  loadingbar: loadingBarReducer
})