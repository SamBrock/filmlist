import { createSlice } from '@reduxjs/toolkit';

import { apiRequest } from './api';
import { tokenConfig } from './auth';
import { userMoviesActioned, userMoviesActionedCleared } from './movies';
import { notificationsRecieved } from './notification';
import { userSeenActioned } from './seen';
import { userWatchlistActioned } from './watchlist';

const slice = createSlice({
  name: 'movie',
  initialState: {
    data: false,
    loading: false
  },
  reducers: {
    movieRequested: (movie, action) => {
      movie.loading = true;
      movie.data = false;
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

export const loadMovie = (filmId) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/movies/details/${filmId}`,
    onStart: movieRequested.type,
    onSuccess: movieReceived.type,
    onError: movieRequestFailed.type,
    headers: tokenConfig(getState).headers
  }))
}

export const addMovieWatchlist = (filmId, title) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/watchlist`,
    method: 'post',
    data: { filmId, title },
    onSuccess: notificationsRecieved.type,
    headers: tokenConfig(getState).headers
  }));

  dispatch({ type: userMoviesActioned.type, payload: { movieId: filmId, actionId: 1 } });
}

export const deleteMovieWatchlist = (filmId, title) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/watchlist`,
    method: 'delete',
    data: { filmId, title },
    onSuccess: notificationsRecieved.type,
    headers: tokenConfig(getState).headers
  }));

  dispatch({ type: userWatchlistActioned.type, payload: { movieId: filmId, actionId: 4 } });
  dispatch({ type: userMoviesActionedCleared.type, payload: { movieId: filmId } });
}

export const addMovieRating = (filmId, rating) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/ratings`,
    method: 'post',
    data: { filmId, rating },
    headers: tokenConfig(getState).headers
  }))

  dispatch({ type: userMoviesActioned.type, payload: { movieId: filmId, actionId: 2 } });
}

export const addMovieLike = (filmId) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/likes`,
    method: 'post',
    data: { filmId },
    headers: tokenConfig(getState).headers
  }))

  dispatch({ type: userMoviesActioned.type, payload: { movieId: filmId, actionId: 2 } });
}

export const deleteMovieLike = (filmId) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/likes`,
    method: 'delete',
    data: { filmId },
    onError: notificationsRecieved.type,
    headers: tokenConfig(getState).headers
  }));
}

export const addMovieSeen = (filmId, title) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/seen`,
    method: 'post',
    data: { filmId, title },
    onSuccess: notificationsRecieved.type,
    headers: tokenConfig(getState).headers
  }))

  dispatch({ type: userMoviesActioned.type, payload: { movieId: filmId, actionId: 2 } });
}

export const deleteMovieSeen = (filmId, title) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/seen`,
    method: 'delete',
    data: { filmId, title },
    onSuccess: notificationsRecieved.type,
    onError: notificationsRecieved.type,
    headers: tokenConfig(getState).headers
  }))

  dispatch({ type: userSeenActioned.type, payload: { movieId: filmId, actionId: 4 } });
  dispatch({ type: userMoviesActionedCleared.type, payload: { movieId: filmId } });
}

export const addMovieNotInterested = (filmId, title) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/not-interested`,
    method: 'post',
    data: { filmId, title },
    onSuccess: notificationsRecieved.type,
    headers: tokenConfig(getState).headers
  }))

  dispatch({ type: userMoviesActioned.type, payload: { movieId: filmId, actionId: 3 } });
}

export const deleteMovieNotInterested = (filmId, title) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}/not-interested`,
    method: 'delete',
    data: { filmId, title },
    onSuccess: notificationsRecieved.type,
    headers: tokenConfig(getState).headers
  }))
}

// Selector
export const getMovieDetails = state => state.entities.movie.data;
export const loading = state => state.entities.movie.loading;