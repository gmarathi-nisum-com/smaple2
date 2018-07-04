import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
import {push} from 'react-router-redux'

export const URL_PREFIX = 'http://localhost:3000/api';

export const VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_ERROR = 'VERIFY_EMAIL_ERROR';


export function verifyEmailRequest(){
  return {
    type: VERIFY_EMAIL_REQUEST,
    loading: true
  }
}

export function verifyEmailSuccess(data){
  return {
    type: VERIFY_EMAIL_SUCCESS,
    loading: false,
    data: data
  }
}

export function verifyEmailError(errors){
  return {
    type: VERIFY_EMAIL_ERROR,
    loading: false,
    errors: errors
  }
}



export function verifyEmail(token) {
  return dispatch => {
    dispatch(verifyEmailRequest());
    return ajax.post(URL_PREFIX + '/auth/confirmation', { token })
      .then(res => {
        dispatch(verifyEmailSuccess(res.data))      
      })
      .catch(errors => {
        dispatch(verifyEmailError(errors))
      })
  }
}