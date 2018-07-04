import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function Contact(state = Map(), action) {
	switch(action.type) {

	case actions.SEND_CONTACT_FORM_REQUEST:
      return state.setIn(['contact', 'loading'], true)
      .deleteIn(['contact', 'errors'])
      .deleteIn(['contact', 'success'])
    case actions.SEND_CONTACT_FORM_SUCCESS: {
      // const loginId = action.user.id

      return state
      .setIn(['contact', 'success'], fromJS(action.data))
      .setIn(['conatct', 'loading'], false)
    }
    case actions.SEND_CONTACT_FORM_ERROR: {
     return state
      .setIn(['contact', 'errors'], fromJS(action.errors))
      .setIn(['contact', 'loading'], false)
    }
    
	  default:
	      return state
	}
}