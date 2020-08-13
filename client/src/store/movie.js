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
      console.log(action.payload);
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

export const loadMovie = (filmId) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/movies/details/${filmId}`,
    onStart: movieRequested.type,
    onSuccess: movieReceived.type,
    onError: movieRequestFailed.type,
    headers: tokenConfig(getState).headers
  }))
}

export const addMovieWatchlist = (filmId) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/watchlist`,
    method: 'post',
    data: { filmId },
    headers: tokenConfig(getState).headers
  }))
}

export const deleteMovieWatchlist = (filmId) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/watchlist`,
    method: 'delete',
    data: { filmId },
    headers: tokenConfig(getState).headers
  }))
}

export const addMovieRating = (filmId, rating) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/ratings`,
    method: 'post',
    data: { filmId, rating },
    headers: tokenConfig(getState).headers
  }))
}

export const addMovieLike = (filmId) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/likes`,
    method: 'post',
    data: { filmId },
    headers: tokenConfig(getState).headers
  }))
}

export const deleteMovieLike = (filmId) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/likes`,
    method: 'delete',
    data: { filmId },
    headers: tokenConfig(getState).headers
  }))
}

export const addMovieSeen = (filmId) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/seen`,
    method: 'post',
    data: { filmId },
    headers: tokenConfig(getState).headers
  }))
}

export const deleteMovieSeen = (filmId) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/seen`,
    method: 'delete',
    data: { filmId },
    headers: tokenConfig(getState).headers
  }))
}

// Selector
export const getMovieDetails = state => state.entities.movie.data;