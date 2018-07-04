import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function ForgotPassword(state = Map(), action) {
	switch(action.type) {

	case actions.FORGOT_PASSWORD_REQUEST:
      return state.setIn(['password', 'loading'], true)
      .deleteIn(['password', 'errors'])
      .deleteIn(['password', 'message'])
    case actions.FORGOT_PASSWORD_SUCCESS: {
      // const loginId = action.user.id
      //   console.log("test message action: ", action.message)
      // console.log("action.message: ", action.message)
      return state
      .setIn(['password', 'message'], fromJS(action.message))
      .setIn(['password', 'loading'], false)
    }
    case actions.FORGOT_PASSWORD_FAIL: {
     return state
      .setIn(['password', 'errors'], fromJS(action.errors))
      .setIn(['password', 'loading'], false)
    }
    
	  default:
	      return state
	}
}