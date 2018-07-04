import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function ResetPassword(state = Map(), action) {
	switch(action.type) {

	case actions.RESET_PASSWORD_REQUEST:
      return state.setIn(['token', 'loading'], true)
      .deleteIn(['token', 'errors'])
      .deleteIn(['token', 'success'])
    case actions.RESET_PASSWORD_SUCCESS: {
      // const loginId = action.user.id

      return state
      .setIn(['token', 'success'], fromJS(action.data))
      .setIn(['token', 'loading'], false)
    }
    case actions.RESET_PASSWORD_ERROR: {
     return state
      .setIn(['token', 'errors'], fromJS(action.errors))
      .setIn(['token', 'loading'], false)
    }

    case actions.RESEND_TOKEN_REQUEST:
      return state.setIn(['resendToken', 'loading'], true)
      .deleteIn(['resendToken', 'errors'])
      .deleteIn(['resendToken', 'success'])
    case actions.RESEND_TOKEN_SUCCESS: {
      // const loginId = action.user.id

      return state
      .setIn(['resendToken', 'success'], fromJS(action.data))
      .setIn(['resendToken', 'loading'], false)
    }
    case actions.RESEND_TOKEN_ERROR: {
     return state
      .setIn(['resendToken', 'errors'], fromJS(action.errors))
      .setIn(['resendToken', 'loading'], false)
    }
    
	  default:
	      return state
	}
}