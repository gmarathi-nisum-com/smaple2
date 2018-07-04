import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function Users(state = Map(), action) {
  switch(action.type) {
  	case actions.SET_URL:
          return state.setIn(['route', 'path'], fromJS(action.url))
    case actions.DELETE_LOGOUT_STATE:
          return state.setIn(['logout', 'status'], false)
    case actions.USER_LOGOUT_REQUEST:
      return state.setIn(['logout', 'status'], action.logout)
                  .deleteIn(['logout', 'status'])
    case actions.USER_LOGOUT_SUCCESS:
// console.log("id: ", JSON.stringify(action.data.user.id))
      return state.setIn(['logout', 'status'], action.logout)
     case actions.FETCH_USER_REQUEST:
      return state.setIn(['userDetails', 'loading'], true)
      .deleteIn(['userDetails', 'errors'])
      .deleteIn(['userDetails', 'success'])
    case actions.FETCH_USER_SUCCESS: {
      // const loginId = action.user.id
       // console.log("userDetails reducer", action.user)
      return state
      .setIn(['userDetails', 'success'], fromJS(action.user))
      .setIn(['userDetails', 'loading'], false)
    }
    case actions.FETCH_USER_FAILURE: {
     return state
      .setIn(['userDetails', 'errors'], action.error)
      .setIn(['userDetails', 'loading'], false)
    }
    default:
      return state
  }
}

export default Users
