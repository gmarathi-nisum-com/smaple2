import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
import {push} from 'react-router-redux'

export const URL_PREFIX = 'http://localhost:3000/api';

export const UPDATE_EMAIL_REQUEST = 'UPDATE_EMAIL_REQUEST';
export const UPDATE_EMAIL_SUCCESS = 'UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_ERROR = 'UPDATE_EMAIL_ERROR';


export function updateEmailRequest(){
  return {
    type: UPDATE_EMAIL_REQUEST,
    loading: true
  }
}

export function updateEmailSuccess(message){
  return {
    type: UPDATE_EMAIL_SUCCESS,
    message: message
  }
}

export function updateEmailError(errors){
  return {
    type: UPDATE_EMAIL_ERROR,
    errors: errors
  }
}



export function updateEmail(data) {
  let id = data.id;
  let email = data.email;
  return dispatch => {
    dispatch(updateEmailRequest());
    return ajax.put(URL_PREFIX + `/user/${id}`, {email: email})
      .then(res => {
        dispatch(updateEmailSuccess(res.data.message))        
      })
      .catch(errors => {
        dispatch(updateEmailError(errors))
      })
  }
}