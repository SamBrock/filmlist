import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from './api';
import { errorsRecieved } from "./error";

const slice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
  },
  reducers: {
    userRequested: (user, action) => {
      user.isLoading = true;
    },
    userReceived: (user, action) => {
      user.isAuthenticated = true;
      user.isLoading = false;
      user.user = action.payload.user;
    },
    userRequestReceived: (user, action) => {
      user.isAuthenticated = true;
      user.isLoading = false;
      user.token = action.payload.token;
      user.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    },
    userRequestFailed: (user, action) => {
      user.token = null;
      user.user = null;
      user.isAuthenticated = false;
      user.isLoading = false;
      localStorage.removeItem('token');
    }
  }
});

export default slice.reducer;

const { userRequested, userReceived, userRequestReceived, userRequestFailed } = slice.actions;

export const registerUser = (username, email, password) => dispatch => {
  const config = { headers: { "content-type": "application/json" } };

  dispatch(apiRequest({
    url: '/api/users',
    method: 'post',
    onStart: userRequested.type,
    onSuccess: userRequestReceived.type,
    onFail: userRequestFailed.type,
    onError: errorsRecieved.type,
    data: { username, email, password },
    config: config
  }))
}

export const loadUser = () => (dispatch, getState) => {  
  dispatch(apiRequest({
    url: '/api/auth/user',
    onStart: userRequested.type,
    onSuccess: userReceived.type,
    onError: userRequestFailed.type,
    config: tokenConfig(getState)
  }))
}

// Selectors
export const getIsAuthenticated = state => state.entities.auth.isAuthenticated;

// Get token and config
export const tokenConfig = getState => {
  const token = getState().entities.auth.token;

  const config = { headers: { "content-type": "application/json" } };

  if (token) config.headers['x-auth-token'] = token;
  return config;
}