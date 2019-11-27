import {FETCH_BLACKJACK_SIM } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_BLACKJACK_SIM:
      return Object.assign({}, state, {
        sim: action.payload || false
      });
    default:
      return state;
  }
}
