import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
export const URL_PREFIX = config.API_URL;
import {push} from 'react-router-redux';

export const SAVE_POST_REQUEST = 'SAVE_POST_REQUEST';
export const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS';
export const SAVE_POST_FAILURE = 'SAVE_POST_FAILURE';

export function savePostRequest() {
  return {
    type: SAVE_POST_REQUEST
  }
}

export function savePostSuccess(user) {
  return {
    type: SAVE_POST_SUCCESS,
    user 
  }
}

export function savePostFailure(ex) {
  return {
    type: SAVE_POST_FAILURE,
    ex
  }
}

export function savePost(data) {
  return dispatch => {
    dispatch(savePostRequest());
    return ajax.get(URL_PREFIX+"/", data)
      .then(res => dispatch(savePostSuccess(res.data)))
      .catch(ex => dispatch(savePostFailure(ex)))
  }
}