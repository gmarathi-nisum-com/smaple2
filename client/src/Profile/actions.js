import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
export const URL_PREFIX = 'http://localhost:3000/api';
import {push} from 'react-router-redux'
import io from 'socket.io-client';

import socket from '../../socket';
const socketClient = socket;

export const SUBMIT_FRIEND_REQUEST = 'SUBMIT_FRIEND_REQUEST';
export const SUBMIT_FRIEND_SUCCESS = 'SUBMIT_FRIEND_SUCCESS';
export const SUBMIT_FRIEND_FAIL = 'SUBMIT_FRIEND_FAIL';

export function submitFriendRequestReq() {
  return {
    type: SUBMIT_FRIEND_REQUEST
  }
}

export function submitFriendRequestSuccess(data) {
  return {
    type: SUBMIT_FRIEND_SUCCESS,
    data
  }
}

export function submitFriendRequestFail(errors) {
  return {
    type: SUBMIT_FRIEND_FAIL,
    errors
  }
}
export function submitFriendRequest(data) {
  return (dispatch) => {
    dispatch(submitFriendRequestReq())
    return ajax.post(URL_PREFIX+`/user/friendRequest`, data)
      .then(res => {
          dispatch(submitFriendRequestSuccess(res))
      })
      .catch(errors => {
        dispatch(submitFriendRequestFail(errors));
      })
  }
}