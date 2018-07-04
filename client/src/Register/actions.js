import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
import {push} from 'react-router-redux'

export const URL_PREFIX = 'http://localhost:3000/api';

export const AUTH_REGISTER_USER_REQUEST = 'AUTH_REGISTER_USER_REQUEST';
export const AUTH_REGISTER_USER_SUCCESS = 'AUTH_REGISTER_USER_SUCCESS';
export const AUTH_REGISTER_USER_ERROR = 'AUTH_REGISTER_USER_ERROR';


export function registerUserRequest(){
  return {
    type: AUTH_REGISTER_USER_REQUEST,
    loading: true
  }
}

export function registerUserSuccess(data){
  return {
    type: AUTH_REGISTER_USER_SUCCESS,
    loading: false,
    data: data
  }
}

export function registerUserError(errors){
  return {
    type: AUTH_REGISTER_USER_ERROR,
    loading: false,
    errors: errors
  }
}



export function registerUser(data) {

  return dispatch => {
    dispatch(registerUserRequest());
    return ajax.post(URL_PREFIX + '/auth/register/', data)
      .then(res => {
        dispatch(registerUserSuccess(res.data))
        setTimeout(function(){
          dispatch(push('/login'))
        }, 2000)
        
      })
      .catch(errors => {
        dispatch(registerUserError(errors))
      })
  }
}