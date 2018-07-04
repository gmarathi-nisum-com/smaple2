import {Map} from 'immutable';
import store from '../store'

//export function isManager(user = Map()) {
//	return extractRoleInfo(user.get('role')) === ROLE_MANAGER
//}

export function getCurrentUser(state = Map()) {
	const loginId = state.getIn(['Users', 'currentUser', 'loginId'])

  return state.getIn(['Users', 'entities', loginId], Map())
}

export function getHomePath(user = Map()) {
		  return '/login';
}

