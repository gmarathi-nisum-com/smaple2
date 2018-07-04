import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
import {push} from 'react-router-redux'

export const URL_PREFIX = 'http://localhost:3000/api';

export const GET_PAGE_CATEGORIES_REQUEST = 'GET_PAGE_CATEGORIES_REQUEST';
export const GET_PAGE_CATEGORIES_SUCCESS = 'GET_PAGE_CATEGORIES_SUCCESS';
export const GET_PAGE_CATEGORIES_ERROR = 'GET_PAGE_CATEGORIES_ERROR';


export function getPageCatogoriesRequest(){
  return {
    type: GET_PAGE_CATEGORIES_REQUEST
  }
}

export function getPageCatogoriesSuccess(data){
  return {
    type: GET_PAGE_CATEGORIES_SUCCESS,
    data: data
  }
}

export function getPageCatogoriesError(message){
  return {
    type: GET_PAGE_CATEGORIES_ERROR,
    message: message
  }
}



export function getPageCatogories() {
  return dispatch => {
    dispatch(getPageCatogoriesRequest());
    return ajax.get(URL_PREFIX + `/general/pageCategories`)
      .then(res => {
        dispatch(getPageCatogoriesSuccess(res.data))      
      })
      .catch(errors => {
        dispatch(getPageCatogoriesError(errors.data.message))
      })
  }
}