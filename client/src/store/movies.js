import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from './api';
import { errorsRecieved } from "./error";

const slice = createSlice({
  name: 'movies',
  initialState: {
    data: [],
    loading: false,
    moreLoading: false
  },
  reducers: {
    moviesRequested: (movies, action) => {
      movies.loading = true;
    },
    moviesReceived: (movies, action) => {
      movies.data = action.payload;
      movies.loading = false;
    },
    moviesRequestFailed: (movies, action) => {
      movies.loading = false;
    },
    moreMoviesRequested: (movies, action) => {
      movies.moreLoading = true;
    },
    moreMoviesReceived: (movies, action) => {
      movies.moreLoading = false;
      movies.data = [...movies.data, ...action.payload];
    }
  }
})

export default slice.reducer;

const { moviesRequested, moviesReceived, moviesRequestFailed, moreMoviesReceived, moreMoviesRequested } = slice.actions;

// Action Creators
export const loadMovies = (pageNumber, limit) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}?page=${pageNumber}&limit=${limit}`,
    onStart: pageNumber != 1 ? moreMoviesRequested.type : moviesRequested.type,
    onSuccess: pageNumber != 1 ? moreMoviesReceived.type : moviesReceived.type,
    onError: errorsRecieved.type,
    onFail: moviesRequestFailed.type
  }))
};

export const loadDefaultMovies = (pageNumber, limit) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/movies/default?page=${pageNumber}&limit=${limit}`,
    onStart: pageNumber != 1 ? moreMoviesRequested.type : moviesRequested.type,
    onSuccess: pageNumber != 1 ? moreMoviesReceived.type : moviesReceived.type,
    onError: moviesRequestFailed.type
  }))
};

// Selectors
export const getMovies = state => state.entities.movies.data;
export const loading = state => state.entities.movies.loading;
export const moreLoading = state => state.entities.movies.moreLoading;