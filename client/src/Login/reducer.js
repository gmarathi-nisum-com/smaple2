import * as actions from './actions';
import {Map, fromJS} from 'immutable';
import isEmpty from 'lodash/isEmpty';

export function Login(state = Map(), action) {
	switch(action.type) {
	// get disasters
	  // case actions.LOGIN_REQUEST:
	  //  return state.setIn(['requests', 'login'], fromJS({ loading: true }))
	  //     .deleteIn(['data'])
	  //   case actions.LOGIN_SUCCESS:
	  //     return state.setIn(['requests', 'login'], fromJS({ loading: false }))
	  //       .setIn(['data', 'login'], fromJS(action.data))
case actions.SET_URL:
          return state.setIn(['route', 'path'], fromJS(action.url))
case actions.FB_LOGIN_DATA:
      return state
            .setIn(['user', 'authenticate'], true)
            .setIn(['user', 'fbData'], fromJS(action.user))
	case actions.LOGIN_REQUEST:
      return state.setIn(['user', 'loading'], true)
            .deleteIn(['user', 'error'])
            .deleteIn(['user', 'data'])
            .deleteIn(['user', 'authenticate'])
            .deleteIn(['user', 'token'])
    case actions.LOGIN_SUCCESS: {
      const loginId = action.user.id
// console.log("id: ", JSON.stringify(action.data.user.id))
      return state
      .setIn(['user', 'currentUser'], fromJS(loginId))
      .setIn(['user', 'data'], fromJS(action.user))
      .setIn(['user', 'entities', loginId], fromJS(action.user))
      .setIn(['user', 'authenticate'], !isEmpty(action.user))
      .setIn(['user', 'loading'], false)
    }
    case actions.LOGIN_FAIL: {
      // console.log("action.errors.authenticated: ", action.errors.authenticated)
      // console.log("action.errors: ", JSON.stringify(action.errors))
      return state
      .setIn(['user', 'error'], fromJS(action.errors))
      .setIn(['user', 'authenticate'], action.errors.authenticated)
      .setIn(['user', 'loading'], false)
    }
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
    case actions.FETCH_USER_SUCCESS:
      return state.setIn(['user', 'entities', action.user.login_id], fromJS(action.user))
      .setIn(['currentUser', 'loginId'], action.user.login_id)
      .setIn(['realUser', 'loginId'], action.user.login_id)
	  default:
	      return state
	}
}