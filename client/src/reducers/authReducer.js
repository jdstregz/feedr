import { FETCH_SESSION, DESTROY_SESSION } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_SESSION:
      return action.payload || false;
    case DESTROY_SESSION:
      return false;
    default:
      return state;
  }
}
