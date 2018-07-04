import {render} from 'react-dom';
import routes from './routes';
// import browserStorage from './browserStorage';
import store from './store';
import * as loginActions from './Login/actions';
import {push} from 'react-router-redux';
import * as loginUtils from './Login/utils';
import {Map, fromJS} from 'immutable';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { setAuthorizationToken } from './utils';
import jwt from 'jsonwebtoken';
// import './style';

injectTapEventPlugin();
console.log("Main index load: ", localStorage.getItem('jwtToken'))
if(localStorage.getItem('jwtToken')){
	let user = jwt.verify(localStorage.getItem('jwtToken'), 'pemmasanidasari')

	setAuthorizationToken(localStorage.getItem('jwtToken'));
	store.dispatch(loginActions.loginSuccess(jwt.verify(localStorage.getItem('jwtToken'), 'pemmasanidasari')));
	store.dispatch(loginActions.fetchUser(user.id)).then(() => {
		//console.log(routes,"routes")
		render(routes, document.getElementById('app'))
	}).then(() => {
    //store.dispatch(ivrActions.fetchIvrProfile(loginId))
  })
}else{
	render(routes, document.getElementById('app'))
}


// const user = browserStorage.get('currentUser')
// console.log("get currentuser in index",user)

// if (user) {
// 	const loginId = user.loginId
// 		store.dispatch(loginActions.loginSuccess({id: loginId, authenticated: true}, user.token))
// 		store.dispatch(loginActions.fetchUser(loginId)).then(() => {
// 		//console.log(routes,"routes")
// 		render(routes, document.getElementById('app'))
// 	}).then(() => {
//     //store.dispatch(ivrActions.fetchIvrProfile(loginId))
//   })
// } else {
// 	render(routes, document.getElementById('app'))
// }