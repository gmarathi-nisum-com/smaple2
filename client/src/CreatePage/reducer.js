import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function CreatePage(state = Map(), action) {
	switch(action.type) {
     case actions.GET_PAGE_CATEGORIES_REQUEST:
      return state.setIn(['getPageCategories', 'loading'], true)
      .deleteIn(['getPageCategories', 'errors'])
      .deleteIn(['getPageCategories', 'success'])
    case actions.GET_PAGE_CATEGORIES_SUCCESS: {
      // const loginId = action.user.id
      console.log("Data from reducer: ", action.data)
      return state
      .setIn(['getPageCategories', 'loading'], false)
      .setIn(['getPageCategories', 'success'], fromJS(action.data))
    }
    case actions.GET_PAGE_CATEGORIES_ERROR: {
     return state
      .setIn(['getPageCategories', 'loading'], false)
      .setIn(['getPageCategories', 'errors'], action.message)
    }

	  default:
	      return state
	}
}