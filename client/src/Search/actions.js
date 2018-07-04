import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
export const URL_PREFIX = 'http://localhost:3000/api';
import {push} from 'react-router-redux'


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
    return ajax.get(URL_PREFIX+`/user/users/all`)
      .then(res => {
          dispatch(fetchUsersSuccess(res.data.users))
      })
      .catch(errors => {
        dispatch(fetchUsersFail(errors));
      })
  }
}