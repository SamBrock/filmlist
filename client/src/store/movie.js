import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from './api';
import { tokenConfig } from './auth';

const slice = createSlice({
  name: 'movie',
  initialState: {
    data: {
      genres: [],
      credits: {
        crew: [],
        cast: []
      }
    },
    loading: false
  },
  reducers: {
    movieRequested: (movie, action) => {
      movie.loading = true;
    },
    movieReceived: (movie, action) => {
      movie.data = action.payload;
      movie.loading = false;
    },
    movieRequestFailed: (movie, action) => {
      movie.loading = false;
    }
  }
})

export default slice.reducer;

const { movieRequested, movieReceived, movieRequestFailed } = slice.actions;

export const loadMovie = (id) => dispatch => {
  dispatch(apiRequest({
    url: `/api/movies/${id}`,
    onStart: movieRequested.type,
    onSuccess: movieReceived.type,
    onError: movieRequestFailed.type
  }))
}

export const addMovieToWatchlist = (id) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: '/api/watchlist',
    method: 'post',
    data: { filmId: id },
    headers: tokenConfig(getState).headers
  }))
}

// Selector
export const getMovieDetails = state => state.entities.movie.data;

