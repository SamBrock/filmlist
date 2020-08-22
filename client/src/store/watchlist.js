import { apiRequest } from "./api";

const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: 'watchlsit',
  initialState: {
    data: [],
    loading: false,
    moreLoading: false
  },
  reducers: {
    watchlistRequested: (watchlist, action) => {
      watchlist.loading = true;
    },
    watchlistReceived: (watchlist, action) => {
      watchlist.loading = false;
      watchlist.data = action.payload;
    },
    watchlistRequestFailed: (watchlist, action) => {
      watchlist.loading = false;
    },
    moreWatchlistRequested: (watchlist, action) => {
      watchlist.moreLoading = true;
    },
    moreWatchlistReceived: (watchlist, action) => {
      watchlist.moreLoading = false;
      watchlist.data = [...watchlist.data, ...action.payload];
    }
  }
});

export default slice.reducer;

const { watchlistReceived, watchlistRequested, watchlistRequestFailed, moreWatchlistReceived, moreWatchlistRequested } = slice.actions;

export const loadWatchlist = (username, pageNumber, limit) => dispatch => {
  dispatch(apiRequest({
    url: `/api/${username}/watchlist?page=${pageNumber}&limit=${limit}`,
    onStart: pageNumber != 1 ? moreWatchlistRequested.type : watchlistRequested.type,
    onSuccess: pageNumber != 1 ? moreWatchlistReceived.type : watchlistReceived.type,
    onError: watchlistRequestFailed.type
  }))
}

export const getWatchlist = state => state.entities.watchlist.data;
export const loading = state => state.entities.watchlist.loading;
export const moreLoading = state => state.entities.watchlist.moreLoading;