import { apiRequest } from "./api";

const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: 'seen',
  initialState: {
    data: [],
    loading: false,
    moreLoading: false
  },
  reducers: {
    seenRequested: (seen, action) => {
      seen.loading = true;
    },
    seenReceived: (seen, action) => {
      seen.data = action.payload;
      seen.loading = false;
    },
    seenRequestFailed: (seen, action) => {
      seen.loading = false;
    },
    moreSeenRequested: (seen, action) => {
      seen.moreLoading = true;
    },
    moreSeenReceived: (seen, action) => {
      seen.moreLoading = false;
      seen.data = [...seen.data, ...action.payload];
    }
  }
});

export default slice.reducer;

const { seenReceived, seenRequested, seenRequestFailed, moreSeenRequested, moreSeenReceived } = slice.actions;

export const loadSeen = (username, pageNumber, limit) => dispatch => {
  dispatch(apiRequest({
    url: `/api/${username}/seen?page=${pageNumber}&limit=${limit}`,
    onStart: pageNumber != 1 ? moreSeenRequested.type : seenRequested.type,
    onSuccess: pageNumber != 1 ? moreSeenReceived.type : seenReceived.type,
    onError: seenRequestFailed.type
  }))
}

export const getSeen = state => state.entities.seen.data;
export const loading = state => state.entities.seen.loading;
export const moreLoading = state => state.entities.seen.moreLoading;