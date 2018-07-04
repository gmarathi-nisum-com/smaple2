import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function Profile(state = Map(), action) {
	switch(action.type) {

    case actions.SUBMIT_FRIEND_REQUEST:
      return state.setIn(['friendRequest', 'loading'], true)
    case actions.SUBMIT_FRIEND_SUCCESS: {
      return state
      .setIn(['friendRequest', 'loading'], false)
      .setIn(['friendRequest', 'success'], fromJS(action.data))
    }
    case actions.SUBMIT_FRIEND_FAIL: {
      return state
      .setIn(['friendRequest', 'loading'], false)
      .setIn(['friendRequest', 'error'], fromJS(action.errors))
    }
	  default:
	      return state
	}
}