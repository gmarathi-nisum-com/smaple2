import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function Settings(state = Map(), action) {
	switch(action.type) {

	case actions.UPDATE_EMAIL_REQUEST:
      return state.setIn(['update', 'email', 'loading'], true)
      .deleteIn(['update', 'email', 'errors'])
      .deleteIn(['update', 'email', 'success'])
    case actions.UPDATE_EMAIL_SUCCESS: {
      // const loginId = action.user.id

      return state
      .setIn(['update', 'email', 'success'], action.message)
      .setIn(['update', 'email', 'loading'], false)
    }
    case actions.UPDATE_EMAIL_ERROR: {
     return state
      .setIn(['update', 'email', 'errors'], action.errors)
      .setIn(['update', 'email', 'loading'], false)
    }
    
	  default:
	      return state
	}
}