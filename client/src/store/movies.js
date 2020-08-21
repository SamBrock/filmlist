import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from './api';
import moment from 'moment';

const slice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    loading: false,
    moreLoading: false
  },
  reducers: {
    moviesRequested: (movies, action) => {
      movies.loading = true;
    },
    moviesReceived: (movies, action) => {
      movies.list = action.payload;
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
      movies.data = action.payload;
    }
  }
})

export default slice.reducer;

const { moviesRequested, moviesReceived, moviesRequestFailed, moreMoviesReceived, moreMoviesRequested } = slice.actions;

// Action Creators
export const loadMovies = (pageNumber, limit) => (dispatch, getState) => {
  dispatch(apiRequest({
    url: `/api/${getState().entities.auth.user.username}?page=${pageNumber}&limit=${limit}`,
    onStart: pageNumber === 1 ? moviesRequested.type : moreMoviesRequested.type,
    onSuccess: pageNumber === 1 ? moviesReceived.type : moviesReceived.type,
    onError: moviesRequestFailed.type
  }))
};

// Selectors
export const getMovies = state => state.entities.movies.list;