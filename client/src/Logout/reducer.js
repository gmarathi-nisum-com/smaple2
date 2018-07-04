import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function Logout(state = Map(), action) {
	switch(action.type) {
	case actions.USER_LOGOUT_REQUEST:
      return state.setIn(['user', 'loading'], true)
            .setIn(['user', 'authenticate'], action.isAuthenticated)
            .deleteIn(['user', 'loading'])
    case actions.USER_LOGOUT_SUCCESS: {
// console.log("id: ", JSON.stringify(action.data.user.id))
      return state.setIn(['user', 'loading'], true)
            .setIn(['user', 'authenticate'], action.isAuthenticated)
    }
	  default:
	      return state
	}
}