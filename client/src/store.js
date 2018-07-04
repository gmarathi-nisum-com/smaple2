/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/

import {Map} from 'immutable';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import browserStorage from './browserStorage';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';

const routingMiddleware = routerMiddleware(browserHistory)

//sessionmiddleware is not required as we are using jsonwebtoken
const sessionMiddleware = _store => next => action => {
  let result = next(action)
    
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      browserStorage.set({
        realUser: {
          loginId: action.user.id,
          token: action.token
        },
        currentUser: {
          loginId: action.user.id,
          token: action.token
        }
      })
       console.log("action in storejs to swtich loop", JSON.stringify(action.user.id))
      break;
    case 'USER_LOGOUT_SUCCESS':
      localStorage.clear()
      break;
    default:
      break;
  }

  return result
}

export default createStore(
  reducer,
  Map(),
  compose(
    applyMiddleware(thunk, sessionMiddleware, routingMiddleware),
    window && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
