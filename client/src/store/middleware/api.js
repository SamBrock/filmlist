import axios from 'axios';
import * as actions from '../api';

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiRequest.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError, config } = action.payload;

  if (onStart) dispatch({ type: onStart });
  next(action);

  try {
    const response = await axios.request({ baseURL: 'http://localhost:3001', url, method, data, config });
    console.log(response);

    dispatch(actions.apiRequestSuccess(response.data))
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
  } catch (err) {
    dispatch(actions.apiRequestFailed());
    if (onError) dispatch({ type: onError, payload: { msg: err.response.data.msg, status: err.response.status } })
  }

  // axios.request({ baseURL: 'http://localhost:3001', url, method, data, config })
  //   .then(res => {
  //     dispatch(actions.apiRequestSuccess(res.data));
  //     if (onSuccess) dispatch({ type: onSuccess, payload: res.data })
  //   })
  //   .catch(err => {
  //     // dispatch(actions.apiRequestFailed(err.response.data));
  //     if (onError) dispatch({ type: onError, payload: { msg: err.response.data, status: err.response.status } })
  //   })
}

export default api;