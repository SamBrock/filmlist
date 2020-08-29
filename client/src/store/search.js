import { apiRequest } from "./api";
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'search',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {
    searchRequested: (search, action) => {
      search.loading = true;
    },
    searchReceived: (search, action) => {
      search.data = action.payload;
      search.loading = false;
    },
    searchRequestFailed: (search, action) => {
      search.loading = false;
    }
  }
});

export default slice.reducer;

const { searchReceived, searchRequested, searchRequestFailed } = slice.actions;

export const search = (query) => dispatch => {
  dispatch(apiRequest({
    url: `/api/search?q=${query}`,
    onStart: searchRequested.type,
    onSuccess: searchReceived.type,
    onError: searchRequestFailed.type
  }))
}

export const getSearchResults = state => state.entities.search.data;
export const loading = state => state.entities.search.loading;