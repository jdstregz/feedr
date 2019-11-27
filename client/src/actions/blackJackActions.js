import axios from 'axios';
import { FETCH_BLACKJACK_SIM } from './types';

export const fetchSimulation = () => async dispatch => {
  const res = await axios.get('/api/blackjack/get-sim');
  dispatch({ type: FETCH_BLACKJACK_SIM, payload: res.data });
};

export const startSimulation = (numDecks) => async dispatch => {
  const res = await axios.post('/api/blackjack/start-sim', {numDecks});
  dispatch({type: FETCH_BLACKJACK_SIM, payload: res.data});
};

export const dealSimulation = () => async dispatch => {
  const res = await axios.get('/api/blackjack/deal-sim');
  dispatch({type: FETCH_BLACKJACK_SIM, payload: res.data});
};

export const hitSimulation = () => async dispatch => {
  const res = await axios.get('/api/blackjack/hit-sim');
  dispatch({type: FETCH_BLACKJACK_SIM, payload: res.data});
};

export const staySimulation = () => async dispatch => {
  const res = await axios.get('/api/blackjack/stay-sim');
  dispatch({type: FETCH_BLACKJACK_SIM, payload: res.data});
};