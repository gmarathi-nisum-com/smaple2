import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function Register(state = Map(), action) {
	switch(action.type) {

	case actions.AUTH_REGISTER_USER_REQUEST:
      return state.setIn(['register', 'loading'], true)
      .deleteIn(['register', 'errors'])
      .deleteIn(['register', 'success'])
    case actions.AUTH_REGISTER_USER_SUCCESS: {
      // const loginId = action.user.id

      return state
      .setIn(['register', 'success'], fromJS(action.data))
      .setIn(['register', 'loading'], false)
    }
    case actions.AUTH_REGISTER_USER_ERROR: {
     return state
      .setIn(['register', 'errors'], fromJS(action.errors))
      .setIn(['register', 'loading'], false)
    }
    
	  default:
	      return state
	}
}