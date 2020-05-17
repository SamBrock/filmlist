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
    moviesRecieved: (movies, action) => {
      movies.list = action.payload.results;
      movies.loading = false;
      movies.lastFetch = Date.now();
    },
    moviesRequestFailed: (movies, action) => {
      movies.loading = false;
    }
  }
})

export default slice.reducer;

const { moviesRequested, moviesRecieved, moviesRequestFailed } = slice.actions;

// Action Creators
export const loadMovies = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.movies;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 10) return;

  dispatch(apiRequest({
    url: '/movie/531428/recommendations?api_key=f232b12b7f9ade28ae71866f4777033a&language=en-US&page=1',
    onStart: moviesRequested.type,
    onSuccess: moviesRecieved.type,
    onError: moviesRequestFailed.type
  }))
};

// Selectors
export const getMovies = state => state.entities.movies.list;