import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from './api';
import moment from 'moment';

const slice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    moviesRequested: (movies, action) => {
      movies.loading = true;
    },
    moviesReceived: (movies, action) => {
      movies.list = action.payload;
      movies.loading = false;
      movies.lastFetch = Date.now();
    },
    moviesRequestFailed: (movies, action) => {
      movies.loading = false;
    }
  }
})

export default slice.reducer;

const { moviesRequested, moviesReceived, moviesRequestFailed } = slice.actions;

// Action Creators
export const loadMovies = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.movies;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 10) return;

  dispatch(apiRequest({
    url: '/api/movies/',
    onStart: moviesRequested.type,
    onSuccess: moviesReceived.type,
    onError: moviesRequestFailed.type
  }))
};

// Selectors
export const getMovies = state => state.entities.movies.list;