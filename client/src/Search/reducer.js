import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function Search(state = Map(), action) {
	switch(action.type) {
	// get disasters
	  // case actions.LOGIN_REQUEST:
	  //  return state.setIn(['requests', 'login'], fromJS({ loading: true }))
	  //     .deleteIn(['data'])
	  //   case actions.LOGIN_SUCCESS:
	  //     return state.setIn(['requests', 'login'], fromJS({ loading: false }))
	  //       .setIn(['data', 'login'], fromJS(action.data))

    case actions.FETCH_USERS_REQUEST:
      return state.setIn(['users', 'loading'], true)
    case actions.FETCH_USERS_SUCCESS: {
      return state
      .setIn(['users', 'all'], fromJS(action.users))
    }
    case actions.FETCH_USERS_FAIL: {
      return state
      .setIn(['users', 'error'], fromJS(action.errors))
    }
	  default:
	      return state
	}
}