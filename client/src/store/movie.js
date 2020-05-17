import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from './api';

const slice = createSlice({
  name: 'movie',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {
    movieRequested: (movie, action) => {
      movie.loading = true
    },
    movieRecieved: (movie, action) => {
      movie.data = action.payload;
      movie.loading = false;
    },
    movieRequestFailed: (movie, action) => {
      movie.loading = false
    }
  }
})

export default slice.reducer;

const { movieRequested, movieRecieved, movieRequestFailed } = slice.actions;

export const loadMovie = (id) => dispatch => {
  dispatch(apiRequest({
    url: `/api/movies/${id}`,
    onStart: movieRequested.type,
    onSuccess: movieRecieved.type,
    onError: movieRequestFailed.type
  }))
}

export const addMovieToWatchlist = (id) => dispatch => {
  dispatch(apiRequest({
    url: '/api/watchlist',
    method : 'post',
    data: {
      filmId: id
    }
  }))
}

// Selector
export const getMovieDetails = state => state.entities.movie.data;