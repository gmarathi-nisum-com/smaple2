import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
import {push} from 'react-router-redux'

export const URL_PREFIX = 'http://localhost:3000/api';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';


export function resetPasswordRequest(){
  return {
    type: RESET_PASSWORD_REQUEST
  }
}

export function resetPasswordSuccess(data){
  return {
    type: RESET_PASSWORD_SUCCESS,
    data: data
  }
}

export function resetPasswordError(errors){
  return {
    type: RESET_PASSWORD_ERROR,
    errors: errors
  }
}



export function resetPassword(token, data) {

  return dispatch => {
    dispatch(resetPasswordRequest());
    return ajax.post(URL_PREFIX + `/auth/resetpassword/${token}`, data)
      .then(res => {
        dispatch(resetPasswordSuccess(res.data))       
      })
      .catch(errors => {
        dispatch(resetPasswordError(errors))
      })
  }
}


export const RESEND_TOKEN_REQUEST = 'RESEND_TOKEN_REQUEST';
export const RESEND_TOKEN_SUCCESS = 'RESEND_TOKEN_SUCCESS';
export const RESEND_TOKEN_ERROR = 'RESEND_TOKEN_ERROR';


export function resendTokenRequest(){
  return {
    type: RESEND_TOKEN_REQUEST
  }
}

export function resendTokenSuccess(data){
  return {
    type: RESEND_TOKEN_SUCCESS,
    data: data
  }
}

export function resendTokenError(errors){
  return {
    type: RESEND_TOKEN_ERROR,
    errors: errors
  }
}



export function resendToken(email) {

  return dispatch => {
    dispatch(resendTokenRequest());
    return ajax.post(URL_PREFIX + `/auth/resend`, { email: email })
      .then(res => {
        dispatch(resendTokenSuccess(res.data))
        setTimeout(function(){
          dispatch(push('/login'))
        }, 2000)      
      })
      .catch(errors => {
        dispatch(resendTokenError(errors))
      })
  }
}
