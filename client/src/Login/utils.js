import {Map} from 'immutable';
import store from '../store'

export function getCurrentUser(state = Map()) {
	const loginId = state.getIn(['Login', 'user', 'currentUser'])
	console.log("get current user login id: ", loginId)
 return state.getIn(['Login', 'user', 'entities', loginId], Map());
}


export function getHomePath(user = Map()) {
	if(user) {	
		var userId = user.get('id')
		let paths = {}
		paths = {
			nt: `dashboard`
		}
		  return paths['nt'];
	  } 
	return '/login';
}

export function extractRoleInfo(role) {
	var rolesList  = [];
	if(role) {
		return role.toString();
	}
	return "";
}
