import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
export const URL_PREFIX = 'http://localhost:3000/api';
import {push} from 'react-router-redux'
import io from 'socket.io-client';

import socket from '../../socket';
const socketClient = socket;

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';

export const CLEAR_STATE_SUCCESS = 'CLEAR_STATE_SUCCESS';
export function postDataRequest() {
  return {
    type: ADD_POST_REQUEST
  }
}

export function postDataSuccess(data) {
  return {
    type: ADD_POST_SUCCESS,
    data
  }
}

export function postDataFail(errors) {
  return {
    type: ADD_POST_FAIL,
    errors
  }
}
export function postData(data) {
  return (dispatch) => {
    dispatch(postDataRequest())
    return ajax.post(URL_PREFIX+`/user/addPost`, data)
      .then(res => {
          dispatch(postDataSuccess(res.data.message))
      })
      .catch(errors => {
        dispatch(postDataFail(errors.data.message));
      })
  }
}

export function clearState() {
    return {
        type: CLEAR_STATE_SUCCESS
    }
}


export const GET_POST_REQUEST = 'GET_POST_REQUEST';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAIL = 'GET_POST_FAIL';

export function getPostDataRequest() {
  return {
    type: GET_POST_REQUEST
  }
}

export function getPostDataSuccess(data) {
  return {
    type: GET_POST_SUCCESS,
    data
  }
}

export function getPostDataFail(errors) {
  return {
    type: GET_POST_FAIL,
    errors
  }
}
export function getPostData(postedTo, postedBy) {
  return (dispatch) => {
    dispatch(getPostDataRequest())
    return ajax.get(URL_PREFIX+`/user/getPost?postedTo=${postedTo}&postedBy=${postedBy}`)
      .then(res => {
          dispatch(getPostDataSuccess(res.data.postData))
      })
      .catch(errors => {
        dispatch(getPostDataFail(errors));
      })
  }
}