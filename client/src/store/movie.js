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
    ui: {
      watchlist: false,
      rating: 0,
      like: false
    },
    loading: false,
    uiLoading: false
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
    },
    uiRequested: (movie, action) => {
      movie.uiLoading = true;
    },
    uiRecieved: (movie, action) => {
      movie.ui = action.payload;
      movie.uiLoading = false;
    },
    uiRequestFailed: (movie, action) => {
      movie.uiLoading = false;
    },
  }
})

export default slice.reducer;

const { movieRequested, movieReceived, movieRequestFailed, uiRequested, uiRecieved, uiRequestFailed } = slice.actions;

export const loadMovie = (filmId) => dispatch => {
  dispatch(apiRequest({
    url: `/api/movies/${filmId}`,
    onStart: movieRequested.type,
    onSuccess: movieReceived.type,
    onError: movieRequestFailed.type
  }))
}

export const loadUI = (filmId) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/${filmId}`,
    onStart: uiRequested.type,
    onSuccess: uiRecieved.type,
    onError: uiRequestFailed.type,
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

// Selector
export const getMovieDetails = state => state.entities.movie.data;
export const getUiData = state => state.entities.movie.ui;
