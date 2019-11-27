import { combineReducers } from 'redux';
import authReducer from './authReducer';
import blackjackReducer from './blackjackReducer';

export default combineReducers({
  auth: authReducer,
  blackjack: blackjackReducer
});
