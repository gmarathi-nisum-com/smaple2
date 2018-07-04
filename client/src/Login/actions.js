import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
import * as loginUtils from './utils';
import { setAuthorizationToken } from '../utils';
import jwt from 'jsonwebtoken';
export const URL_PREFIX = 'http://localhost:3000/api';
import {push} from 'react-router-redux'
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const FB_LOGIN_DATA = 'FB_LOGIN_DATA';
export const FB_LOGIN_SUCCESS = 'FB_LOGIN_SUCCESS';
export const FB_LOGIN_FAIL = 'FB_LOGIN_FAIL';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export function fetchUserRequest() {
  return {
    type: FETCH_USER_REQUEST
  }
}

export function fetchUserSuccess(user) {
  return {
    type: FETCH_USER_SUCCESS,
    user 
  }
}

export function fetchUserFailure(ex) {
  return {
    type: FETCH_USER_FAILURE,
    ex
  }
}

export function fetchUser(login_id) {
  //var loginRequestObj = {"login_id": login_id}
  return dispatch => {
    dispatch(fetchUserRequest());
    return ajax.get(URL_PREFIX+"/user/"+login_id)
      .then(res => dispatch(fetchUserSuccess(res.data.users)))
      .catch(ex => dispatch(fetchUserFailure(ex)))
  }
}

export function fbLogin(user) {
  return {
    type: FB_LOGIN_DATA,
    user
  }
}
export function loginRequest(user, password) {
  return {
    type: LOGIN_REQUEST,
    user,
    password
  }
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

export function loginFail(errors) {
  return {
    type: LOGIN_FAIL,
    errors
  }
}

// export function loginUser({ email, password }) {
//   return dispatch => {
//         dispatch(loginRequest({email, password }));

//         return ajax.post(config.API_URL+'/auth/login', { email, password })
//             .then(res => {
//                 dispatch(loginSuccess(res.data))
//             })
//             .catch(errors => dispatch(loginFail(errors)));
//     }
// }

export function loginUser(email, password) {
  return (dispatch, getState) => {
    dispatch(loginRequest())
    return ajax.post(URL_PREFIX+"/auth/login", { email, password })
      .then(res => {          
              // console.log("path: ", path)
          const token = res.data.token;
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(loginSuccess(jwt.verify(token, 'pemmasanidasari')))
          // var verified = jwt.verify(token, 'pemmasanidasari')
          const user = loginUtils.getCurrentUser(getState())
          const path = loginUtils.getHomePath(user)
          console.log("verified user: ", user)
          dispatch(push(path))
          // setTimeout(function(){
          //   dispatch(push(path))
          // }, 2000)
      })
      .catch(errors => {
        dispatch(loginFail(errors));
      })
  }
}

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

export function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUEST
  }
}

export function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    users
  }
}

export function fetchUsersFail(errors) {
  return {
    type: FETCH_USERS_FAIL,
    errors
  }
}
export function fetchUsers() {
  return (dispatch) => {
    dispatch(fetchUsersRequest())
    return ajax.get(URL_PREFIX+"/user/users/all")
      .then(res => {
          dispatch(fetchUsersSuccess(res.data.users))
      })
      .catch(errors => {
        dispatch(fetchUsersFail(errors));
      })
  }
}

export const SET_URL = 'SET_URL'
  export function setURL(url) {
    return {
      type: SET_URL,
      url
    }
  }