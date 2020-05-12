import { combineReducers } from 'redux';
import moviesReducer from './moviesList';

export default combineReducers({
    movies: moviesReducer
})