import { apiRequest } from "./api";

const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: 'watchlsit',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {
    likesRequested: (likes, action) => {
      likes.loading = true;
    },
    likesReceived: (likes, action) => {
      likes.data = action.payload;
      likes.loading = false;
    },
    likesRequestFailed: (likes, action) => {
      likes.loading = false;
    }
  }
});

export default slice.reducer;

const { likesReceived, likesRequested, likesRequestFailed } = slice.actions;

export const loadLikes = (username) => dispatch => {
  dispatch(apiRequest({
    url: `/api/${username}/likes`,
    onStart: likesRequested.type,
    onSuccess: likesReceived.type,
    onError: likesRequestFailed.type
  }))
}

export const getLikes = state => state.entities.likes.data;