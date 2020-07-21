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
      // error.id = action.payload.id;
      // error.status = action.payload.status;
      error.msg = action.payload.msg;
    },
    errorsDeleted: (error, action) => {
      error.id = null;
      error.status = null;
      error.msg = {};
    }
  }
})

export default slice.reducer;

export const { errorsRecieved, errorsDeleted } = slice.actions;

export const returnErrors = (msg, status, id = null) => {
  return {
    type: errorsRecieved.type,
    payload: { msg, status, id }
  }
}

export const deleteErrors = () => {
  return {
    type: errorsDeleted.type
  }
}

// Selectors
export const getRegisterError = state => state.entities.error.msg;