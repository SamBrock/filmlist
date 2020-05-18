import { combineReducers } from 'redux';
import moviesReducer from './movies';
import movieReducer from './movie';
import loadingBarReducer from './loadingBar';

export default combineReducers({
    movies: moviesReducer,
    movie: movieReducer,
    loadingbar: loadingBarReducer
})