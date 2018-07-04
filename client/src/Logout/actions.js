export const URL_PREFIX = 'http://localhost:3000/api';
import {push} from 'react-router-redux'
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';

export function logoutRequest() {
  return {
    type: USER_LOGOUT_REQUEST,
    isAuthenticated: true
  }
}

export function logoutSuccess() {
  return {
    type: USER_LOGOUT_SUCCESS,
    isAuthenticated: false
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(logoutRequest())
    localStorage.removeItem('jwToken')
    dispatch(logoutSuccess())
    dispatch(push('/login'));
  }
}