import ajax from '../ajax';
import {push} from 'react-router-redux';
import * as userUtils from '../Users/utils';
import config from '../config';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_FAIL_EOC = 'LOGIN_FAIL_EOC';
export const USER_LOGOUT = 'USER_LOGOUT';


export const URL_PREFIX = '';


// export const URL_PREFIX='';
 //export const URL_PREFIX = 'http://txsleocda1v:5004';

export function fetchUserRequest() {
  return {
    type: FETCH_USER_REQUEST
  }
}

export function fetchUserSuccess(user) {
  // console.log("User details action: ", user)
  return {
    type: FETCH_USER_SUCCESS,
    user 
  }
}

export function fetchUserFailure(error) {
  return {
    type: FETCH_USER_FAILURE,
    error
  }
}

export function setCurrentUserId(login_id) {
  return {
    type: SET_CURRENT_USER_ID,
    login_id
  }
}

export function setUserPassword(login_id, password) {
  return {
    type: 'SET_USER_PASSWORD',
    login_id,
    password
  }
}

export const DELETE_LOGOUT_STATE = 'DELETE_LOGOUT_STATE';
export function deleteLogoutState() {
  return {
    type: DELETE_LOGOUT_STATE
  }
}

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';

export function logoutRequest() {
  return {
    type: USER_LOGOUT_REQUEST,
    logout: false
  }
}

export function logoutSuccess() {
  return {
    type: USER_LOGOUT_SUCCESS,
    logout: true
  }
}

export function logout() {
  return dispatch => {
    dispatch(logoutRequest())
    localStorage.removeItem('jwtToken')
    dispatch(logoutSuccess())
    // dispatch(push('/login'));
  }
}

export function fetchUser(id) {
	//var loginRequestObj = {"login_id": login_id}
  return dispatch => {
    dispatch(fetchUserRequest());
    return ajax.get(`${config.API_URL}/user/${id}`)
      .then(res => dispatch(fetchUserSuccess(res.data.user)))
      .catch(ex => dispatch(fetchUserFailure(ex)))
  }
}

export function fetchCurrentUser() {
  return dispatch => {
    dispatch(fetchUserRequest());
    return ajax.get(`/user`)
      .then(res => dispatch(fetchUserSuccess(res.data.user)))
      .catch(ex => dispatch(fetchUserFailure(ex)))
  }
}

export const ATTEMPT_CLEAR_MESSAGE = 'ATTEMPT_CLEAR_MESSAGE'
export function clearMessages(user) {
  return {
    type: ATTEMPT_CLEAR_MESSAGE,
    user
  }
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess(user, password) {
  return {
    type: LOGIN_SUCCESS,
    user,
    password
  }
}

export function loginFail(errors) {
  return {
    type: LOGIN_FAIL,
    errors
  }
}

export function loginFailEOC(errors) {
	  return {
	    type: LOGIN_FAIL_EOC,
	    errors
	  }
	}

export function login(email, password) {
  return (dispatch, getState) => {
    dispatch(loginRequest())
    return ajax.post(`${config.API_URL}/auth/login`, { email, password })
      .then(res => {
    		  dispatch(loginSuccess(response.data.success))
    	        const user = userUtils.getCurrentUser(getState())
    	        const path = userUtils.getHomePath(user)
    	        dispatch(push(path))
      })
      .catch(errors => {
    	  dispatch(loginFail(errors));
    	  //dispatch(push(undefined))
      })
  }
}

export const CREATE_LOGIN_REQUEST = 'CREATE_LOGIN_REQUEST';
export const CREATE_LOGIN_SUCCESS = 'CREATE_LOGIN_SUCCESS';
export const CREATE_LOGIN_FAIL = 'CREATE_LOGIN_FAIL';

export function createloginRequest() {
	  return {
	    type: CREATE_LOGIN_REQUEST
	  }
	}

	export function createloginSuccess(loginId, password) {
	  return {
	    type: CREATE_LOGIN_SUCCESS,
	    loginId,
	    password
	  }
	}

	export function createloginFail(errors) {
	  return {
	    type: CREATE_LOGIN_FAIL,
	    errors
	  }
	}

export function createLogin(loginId, password, eocPassword, reeocPassword, allRoles) {
	var createLoginReqObj = {"login_id" : loginId, edn_password : password, eoc_password : eocPassword, roles : allRoles}
	  return (dispatch, getState) => {
		if(eocPassword!=reeocPassword)
			dispatch(createloginFail([{"detail":"EOC password and retyped EOC password do not match.."}]))
			else
				{
	    dispatch(createloginRequest())
	    return ajax.post(URL_PREFIX+`/InsertLoginDetails/`, createLoginReqObj)
	      .then(res => {
	        dispatch(createloginSuccess(loginId, password))
	        const user = userUtils.getCurrentUser(getState())
	      })
	      .catch(errors => dispatch(createloginFail(errors)))
	  }}
	}


export const SET_URL = 'SET_URL'
  export function setURL(url) {
    return {
      type: SET_URL,
      url
    }
  }