import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
export const URL_PREFIX = 'http://localhost:3000/api';
import {push} from 'react-router-redux'
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';

export function forgotPasswordTokenRequest(email) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    email
  }
}

export function forgotPasswordTokenSuccess(message) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    message
  }
}

export function forgotPasswordTokenFail(errors) {
  return {
    type: FORGOT_PASSWORD_FAIL,
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

export function getForgotPasswordToken(email) {
  return (dispatch) => {
    dispatch(forgotPasswordTokenRequest())
    return ajax.post(URL_PREFIX+"/auth/fpass", {email})
      .then(res => {          
          dispatch(forgotPasswordTokenSuccess(res.data.message))
      })
      .catch(errors => {
        dispatch(forgotPasswordTokenFail(errors));
      })
  }
}