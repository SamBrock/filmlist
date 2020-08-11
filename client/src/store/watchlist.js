import { apiRequest } from "./api";

const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: 'watchlsit',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {
    watchlistRequested: (watchlist, action) => {
      watchlist.loading = true;
    },
    watchlistReceived: (watchlist, action) => {
      watchlist.data = action.payload;
      watchlist.loading = false;
    },
    watchlistRequestFailed: (watchlist, action) => {
      watchlist.loading = false;
    }
  }
});

export default slice.reducer;

const { watchlistReceived, watchlistRequested, watchlistRequestFailed } = slice.actions;

export const loadWatchlist = (username) => dispatch => {
  dispatch(apiRequest({
    url: `/api/${username}/watchlist`,
    onStart: watchlistRequested.type,
    onSuccess: watchlistReceived.type,
    onError: watchlistRequestFailed.type
  }))
}

export const getWatchlist = state => state.entities.watchlist.data;