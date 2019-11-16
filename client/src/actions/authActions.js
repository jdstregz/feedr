import axios from 'axios';

import { FETCH_SESSION, DESTROY_SESSION } from './types';

export const fetchSession = () => async dispatch => {
  const res = await axios.get('/auth/current-session');
  dispatch({ type: FETCH_SESSION, payload: res.data });
};

export const destroySession = history => async dispatch => {
  const res = await axios.get('/auth/logout');
  dispatch({ type: DESTROY_SESSION, payload: res.data });
  history.push('/login');
};

export const startSession = (username, password) => async dispatch => {
  const res = await axios.post('/auth/login', { username, password });
  dispatch({ type: FETCH_SESSION, payload: res.data });
};

export const signupRequest = (email, username, password, name) => async () => {
  console.log('hello');
  return await axios.post('/auth/signup', { email, password, username, name });
};
