import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function Email(state = Map(), action) {
	switch(action.type) {

	case actions.VERIFY_EMAIL_REQUEST:
      return state.setIn(['verify', 'loading'], true)
      .deleteIn(['verify', 'errors'])
      .deleteIn(['verify', 'success'])
    case actions.VERIFY_EMAIL_SUCCESS: {
      // const loginId = action.user.id

      return state
      .setIn(['verify', 'success'], fromJS(action.data))
      .setIn(['verify', 'loading'], false)
    }
    case actions.VERIFY_EMAIL_ERROR: {
     return state
      .setIn(['verify', 'errors'], fromJS(action.errors))
      .setIn(['verify', 'loading'], false)
    }
    
	  default:
	      return state
	}
}