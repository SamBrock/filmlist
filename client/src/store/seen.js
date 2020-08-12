import { apiRequest } from "./api";

const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: 'seen',
  initialState: {
    data: [],
    loading: false
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
    }
  }
});

export default slice.reducer;

const { seenReceived, seenRequested, seenRequestFailed } = slice.actions;

export const loadSeen = (username) => dispatch => {
  dispatch(apiRequest({
    url: `/api/${username}/seen`,
    onStart: seenRequested.type,
    onSuccess: seenReceived.type,
    onError: seenRequestFailed.type
  }))
}

export const getSeen = state => state.entities.seen.data;