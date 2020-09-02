import axios from 'axios';
import * as actions from '../api';

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiRequest.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError, onFail, headers } = action.payload;

  if (onStart) dispatch({ type: onStart });
  next(action);

  try {
    const response = await axios({ url, method, data, headers });

    dispatch(actions.apiRequestSuccess(response.data))
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
  } catch (err) {
    dispatch(actions.apiRequestFailed());
    if (onError) dispatch({ type: onError, payload: { id: err.response.data.id, status: err.response.status, msg: err.response.data.msg } });
    if (onFail) dispatch({ type: onFail, payload: { id: err.response.data.id, status: err.response.status, msg: err.response.data.msg } });
  }
}

export default api;