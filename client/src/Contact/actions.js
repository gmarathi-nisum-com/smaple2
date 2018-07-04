import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
import {push} from 'react-router-redux'

export const URL_PREFIX = 'http://localhost:3000/api';

export const SEND_CONTACT_FORM_REQUEST = 'SEND_CONTACT_FORM_REQUEST';
export const SEND_CONTACT_FORM_SUCCESS = 'SEND_CONTACT_FORM_SUCCESS';
export const SEND_CONTACT_FORM_ERROR = 'SEND_CONTACT_FORM_ERROR';


export function sendContactFormRequest(){
  return {
    type: SEND_CONTACT_FORM_REQUEST,
    loading: true
  }
}

export function sendContactFormSuccess(data){
  return {
    type: SEND_CONTACT_FORM_SUCCESS,
    loading: false,
    data: data
  }
}

export function sendContactFormError(errors){
  return {
    type: SEND_CONTACT_FORM_ERROR,
    loading: false,
    errors: errors
  }
}



export function sendContactForm(firstName, lastName, email, subject, message) {
  return dispatch => {
    dispatch(sendContactFormRequest());
    return ajax.post(URL_PREFIX + '/communication/contact', { firstName, lastName, email, subject, message })
      .then(res => {
        dispatch(sendContactFormSuccess(res.data))

        
      })
      .catch(errors => {
        dispatch(sendContactFormError(errors))
      })
  }
}