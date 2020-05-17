import { combineReducers } from 'redux';
import moviesReducer from './movies';
import movieReducer from './movie';

export default combineReducers({
    movies: moviesReducer,
    movie: movieReducer
})