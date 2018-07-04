import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function Post(state = Map(), action) {
	switch(action.type) {

    case actions.ADD_POST_REQUEST:
      return state.setIn(['add', 'loading'], true)
    case actions.ADD_POST_SUCCESS: {
      return state
      .setIn(['add', 'loading'], false)
      .setIn(['add', 'success'], fromJS(action.data))
    }
    case actions.ADD_POST_FAIL: {
      return state
      .setIn(['add', 'loading'], false)
      .setIn(['add', 'error'], fromJS(action.errors))
    }
    case actions.GET_POST_REQUEST:
      return state.setIn(['get', 'loading'], true)
    case actions.GET_POST_SUCCESS: {
      return state
      .setIn(['get', 'loading'], false)
      .setIn(['get', 'success'], fromJS(action.data))
    }
    case actions.GET_POST_FAIL: {
      return state
      .setIn(['get', 'loading'], false)
      .setIn(['get', 'error'], fromJS(action.errors))
    }
    case actions.CLEAR_STATE_SUCCESS:
            return state = Map()
	  default:
	      return state
	}
}