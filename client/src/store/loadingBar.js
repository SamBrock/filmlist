import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'loadingBar',
  initialState: {
    loadingBarProgress: 0
  },
  reducers: {
    start: (state, action) => {
      state.loadingBarProgress = Math.floor(Math.random() * 40) + 10;
    },
    complete: (state, action) => {
      state.loadingBarProgress = 100;
    },
    reset: (state, action) => {
      state.loadingBarProgress = 0;
    }
  }
});

export default slice.reducer;

export const { start, complete, reset } = slice.actions;

export const loadingBarComplete = () => (dispatch) => {
  dispatch(complete());

  setTimeout(() => {
    dispatch(reset());
  }, 300);
}