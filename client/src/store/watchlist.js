import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from './api';

const slice = createSlice({
  name: 'watchlsit',
  initialState: {
    data: [],
    loading: false,
    pageNum: 1,
    count: null,
  },
  reducers: {
    initialRequested: (watchlist, action) => {
      watchlist.data = [];
      watchlist.pageNum = 2;
      watchlist.loading = true;
    },
    watchlistRequested: (watchlist, action) => {
      watchlist.loading = true;
      watchlist.pageNum = watchlist.pageNum + 1;
    },
    watchlistReceived: (watchlist, action) => {
      watchlist.data = [...watchlist.data, ...action.payload];
      watchlist.loading = false;
    },
    watchlistRequestFailed: (watchlist, action) => {
      watchlist.loading = false;
    }
  }
});

export default slice.reducer;

const { initialRequested, watchlistReceived, watchlistRequested, watchlistRequestFailed } = slice.actions;

export const loadWatchlist = (username, initial = false) => (dispatch, getState) => {
  const limit = 20;

  dispatch(apiRequest({
    url: initial ? `/api/${username}/watchlist?page=1&limit=${limit}` : `/api/${username}/watchlist?page=${getState().entities.watchlist.pageNum}&limit=${limit}`,
    onStart: initial ? initialRequested.type : watchlistRequested.type,
    onSuccess: watchlistReceived.type,
    onError: watchlistRequestFailed.type
  }))
}

export const getWatchlist = state => state.entities.watchlist.data;
export const loading = state => state.entities.watchlist.loading;