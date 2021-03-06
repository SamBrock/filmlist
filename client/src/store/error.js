const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: 'error',
  initialState: {
    id: null,
    status: null,
    msg: ''
  },
  reducers: {
    errorsRecieved: (error, action) => {
      error.id = action.payload.id;
      error.status = action.payload.status;
      error.msg = action.payload.msg;
    },
    errorsDeleted: (error, action) => {
      error.id = null;
      error.status = null;
      error.msg = '';
    }
  }
})

export default slice.reducer;

export const { errorsRecieved, errorsDeleted } = slice.actions;

export const clearErrors = () => dispatch => {
  dispatch({ type: errorsDeleted.type});
}

// Selectors
export const getRegisterError = state => state.entities.error.id === 'REGISTER_ERROR' ? state.entities.error.msg : null;
export const getLoginError = state => state.entities.error.id === 'LOGIN_ERROR' ? state.entities.error.msg : null;
export const getMoviesError = state => state.entities.error.id === 'MOVIES_ERROR' ? true : null;
export const getMovieError = state => state.entities.error.id === 'MOVIE_ERROR' ? state.entities.error : null;