import ajax from '../ajax';
import {Map, fromJS} from 'immutable';
import config from '../config';
import {push} from 'react-router-redux'

export const URL_PREFIX = 'http://localhost:3000/api';


export const SAVE_USER_PROFILE_IMAGE_REQUEST = 'SAVE_USER_PROFILE_IMAGE_REQUEST';
export const SAVE_USER_PROFILE_IMAGE_SUCCESS = 'SAVE_USER_PROFILE_IMAGE_SUCCESS';
export const SAVE_USER_PROFILE_IMAGE_ERROR = 'SAVE_USER_PROFILE_IMAGE_ERROR';


export function saveUploadedImageRequest(){
  return {
    type: SAVE_USER_PROFILE_IMAGE_REQUEST
  }
}

export function saveUploadedImageSuccess(message){
  return {
    type: SAVE_USER_PROFILE_IMAGE_SUCCESS,
    message: message
  }
}

export function saveUploadedImageError(errors){
  return {
    type: SAVE_USER_PROFILE_IMAGE_ERROR,
    message: errors
  }
}

export function saveUploadedImage(data) {
  return dispatch => {
    dispatch(saveUploadedImageRequest());
    return ajax.put(URL_PREFIX + `/user/save/profileImage`, data)
      .then(res => {
        dispatch(saveUploadedImageSuccess(res.data.message))      
      })
      .catch(errors => {
        dispatch(saveUploadedImageError(errors))
      })
  }
}

export const SAVE_USER_COVER_PHOTO_REQUEST = 'SAVE_USER_COVER_PHOTO_REQUEST';
export const SAVE_USER_COVER_PHOTO_SUCCESS = 'SAVE_USER_COVER_PHOTO_SUCCESS';
export const SAVE_USER_COVER_PHOTO_ERROR = 'SAVE_USER_COVER_PHOTO_ERROR';


export function saveCoverPhotoRequest(){
  return {
    type: SAVE_USER_COVER_PHOTO_REQUEST
  }
}

export function saveCoverPhotoSuccess(message){
  return {
    type: SAVE_USER_COVER_PHOTO_SUCCESS,
    message: message
  }
}

export function saveCoverPhotoError(errors){
  return {
    type: SAVE_USER_COVER_PHOTO_ERROR,
    message: errors
  }
}

export function saveCoverPhoto(data) {
  return dispatch => {
    dispatch(saveCoverPhotoRequest());
    return ajax.put(URL_PREFIX + `/user/save/coverPhoto`, data)
      .then(res => {
        dispatch(saveCoverPhotoSuccess(res.data.message))      
      })
      .catch(errors => {
        dispatch(saveCoverPhotoError(errors))
      })
  }
}

export const SAVE_USER_FAV_REQUEST = 'SAVE_USER_FAV_REQUEST';
export const SAVE_USER_FAV_SUCCESS = 'SAVE_USER_FAV_SUCCESS';
export const SAVE_USER_FAV_ERROR = 'SAVE_USER_FAV_ERROR';


export function saveUserFavRequest(){
  return {
    type: SAVE_USER_FAV_REQUEST
  }
}

export function saveUserFavSuccess(message){
  return {
    type: SAVE_USER_FAV_SUCCESS,
    message: message
  }
}

export function saveUserFavError(errors){
  return {
    type: SAVE_USER_FAV_ERROR,
    message: errors
  }
}



export function saveUserFav(data) {
  return dispatch => {
    dispatch(saveUserFavRequest());
    return ajax.post(URL_PREFIX + `/user/save/userFav`, data)
      .then(res => {
        dispatch(saveUserFavSuccess(res.data.message))      
      })
      .catch(errors => {
        dispatch(saveUserFavError(errors.data.message))
      })
  }
}

export const UPDATE_USER_FAV_REQUEST = 'UPDATE_USER_FAV_REQUEST';
export const UPDATE_USER_FAV_SUCCESS = 'UPDATE_USER_FAV_SUCCESS';
export const UPDATE_USER_FAV_ERROR = 'UPDATE_USER_FAV_ERROR';


export function updateUserFavRequest(){
  return {
    type: UPDATE_USER_FAV_REQUEST
  }
}

export function updateUserFavSuccess(message){
  return {
    type: UPDATE_USER_FAV_SUCCESS,
    message: message
  }
}

export function updateUserFavError(errors){
  return {
    type: UPDATE_USER_FAV_ERROR,
    message: errors
  }
}



export function updateUserFav(id, data) {
  return dispatch => {
    dispatch(updateUserFavRequest());
    return ajax.put(URL_PREFIX + `/user/update/userFav/${id}`, data)
      .then(res => {
        dispatch(updateUserFavSuccess(res.data.message))      
      })
      .catch(errors => {
        dispatch(updateUserFavError(errors.data.message))
      })
  }
}

export const GET_USER_FAV_REQUEST = 'GET_USER_FAV_REQUEST';
export const GET_USER_FAV_SUCCESS = 'GET_USER_FAV_SUCCESS';
export const GET_USER_FAV_ERROR = 'GET_USER_FAV_ERROR';


export function getUserFavRequest(){
  return {
    type: GET_USER_FAV_REQUEST
  }
}

export function getUserFavSuccess(data){
  // console.log("Test usefav data from action: ", data)
  return {
    type: GET_USER_FAV_SUCCESS,
    data: data
  }
}

export function getUserFavError(errors){
  return {
    type: GET_USER_FAV_ERROR,
    message: errors
  }
}



export function getUserFav(userId) {
  return dispatch => {
    dispatch(getUserFavRequest());
    return ajax.get(URL_PREFIX + `/user/fav/${userId}`)
      .then(res => {
        // console.log("Data dispatch: ", res.data)
        dispatch(getUserFavSuccess(res.data.user))      
      })
      .catch(errors => {
        dispatch(getUserFavError(errors.data))
      })
  }
}


export const DELETE_CHIP_USER_FAV_REQUEST = 'DELETE_CHIP_USER_FAV_REQUEST';
export const DELETE_CHIP_USER_FAV_SUCCESS = 'DELETE_CHIP_USER_FAV_SUCCESS';
export const DELETE_CHIP_USER_FAV_ERROR = 'DELETE_CHIP_USER_FAV_ERROR';


export function deleteChipUserFavRequest(){
  return {
    type: DELETE_CHIP_USER_FAV_REQUEST
  }
}

export function deleteChipUserFavSuccess(message){
  return {
    type: DELETE_CHIP_USER_FAV_SUCCESS,
    message: message
  }
}

export function deleteChipUserFavError(message){
  return {
    type: DELETE_CHIP_USER_FAV_ERROR,
    message: message
  }
}



export function deleteFavChip(id) {
  return dispatch => {
    dispatch(deleteChipUserFavRequest());
    return ajax.delete(URL_PREFIX + `/user/fav/${id}`)
      .then(res => {
        dispatch(deleteChipUserFavSuccess(res.data.message))      
      })
      .catch(errors => {
        dispatch(deleteChipUserFavError(errors.data.message))
      })
  }
}


export const SAVE_ABOUT_ME_REQUEST = 'SAVE_ABOUT_ME_REQUEST';
export const SAVE_ABOUT_ME_SUCCESS = 'SAVE_ABOUT_ME_SUCCESS';
export const SAVE_ABOUT_ME_ERROR = 'SAVE_ABOUT_ME_ERROR';


export function saveAboutmeRequest(){
  return {
    type: SAVE_ABOUT_ME_REQUEST
  }
}

export function saveAboutmeSuccess(message){
  return {
    type: SAVE_ABOUT_ME_SUCCESS,
    message: message
  }
}

export function saveAboutmeError(errors){
  return {
    type: SAVE_ABOUT_ME_ERROR,
    message: errors
  }
}



export function saveAboutme(data) {
  return dispatch => {
    dispatch(saveAboutmeRequest());
    return ajax.post(URL_PREFIX + `/user/save/aboutMe`, data)
      .then(res => {
        dispatch(saveAboutmeSuccess(res.data.message))      
      })
      .catch(errors => {
        dispatch(saveAboutmeError(errors.data.message))
      })
  }
}



export const GET_ABOUT_ME_REQUEST = 'GET_ABOUT_ME_REQUEST';
export const GET_ABOUT_ME_SUCCESS = 'GET_ABOUT_ME_SUCCESS';
export const GET_ABOUT_ME_ERROR = 'GET_ABOUT_ME_ERROR';


export function getAboutmeRequest(){
  return {
    type: GET_ABOUT_ME_REQUEST
  }
}

export function getAboutmeSuccess(data){
  return {
    type: GET_ABOUT_ME_SUCCESS,
    data: data
  }
}

export function getAboutmeError(errors){
  return {
    type: GET_ABOUT_ME_ERROR,
    message: errors
  }
}



export function getAboutme(userId) {
  return dispatch => {
    dispatch(getAboutmeRequest());
    return ajax.get(URL_PREFIX + `/user/aboutme/${userId}`)
      .then(res => {
        dispatch(getAboutmeSuccess(res.data.userAboutme))      
      })
      .catch(errors => {
        dispatch(getAboutmeError(errors.data))
      })
  }
}


export const UPDATE_ABOUT_ME_REQUEST = 'UPDATE_ABOUT_ME_REQUEST';
export const UPDATE_ABOUT_ME_SUCCESS = 'UPDATE_ABOUT_ME_SUCCESS';
export const UPDATE_ABOUT_ME_ERROR = 'UPDATE_ABOUT_ME_ERROR';


export function updateAboutmeRequest(){
  return {
    type: UPDATE_ABOUT_ME_REQUEST
  }
}

export function updateAboutmeSuccess(message){
  return {
    type: UPDATE_ABOUT_ME_SUCCESS,
    message: message
  }
}

export function updateAboutmeError(errors){
  return {
    type: UPDATE_ABOUT_ME_ERROR,
    message: errors
  }
}



export function updateAboutme(id, data) {
  return dispatch => {
    dispatch(updateAboutmeRequest());
    return ajax.put(URL_PREFIX + `/user/update/aboutMe/${id}`, data)
      .then(res => {
        dispatch(updateAboutmeSuccess(res.data.message))      
      })
      .catch(errors => {
        dispatch(updateAboutmeError(errors.data.message))
      })
  }
}

export const SAVE_TO_STORE_REQUEST = 'SAVE_TO_STORE_REQUEST';

export function saveToStore(data){
  return {
    type: SAVE_TO_STORE_REQUEST,
    data: data
  }
}


export const GET_ASK_PREFERENCES_REQUEST = 'GET_ASK_PREFERENCES_REQUEST';
export const GET_ASK_PREFERENCES_SUCCESS = 'GET_ASK_PREFERENCES_SUCCESS';
export const GET_ASK_PREFERENCES_ERROR = 'GET_ASK_PREFERENCES_ERROR';


export function getAskPreferencesRequest(){
  return {
    type: GET_ASK_PREFERENCES_REQUEST
  }
}

export function getAskPreferencesSuccess(data){
  return {
    type: GET_ASK_PREFERENCES_SUCCESS,
    data: data
  }
}

export function getAskPreferencesError(errors){
  return {
    type: GET_ASK_PREFERENCES_ERROR,
    message: errors
  }
}



export function getAskPreferences(userId) {
  return dispatch => {
    dispatch(getAskPreferencesRequest());
    return ajax.get(URL_PREFIX + `/user/askPref/${userId}`)
      .then(res => {
        dispatch(getAskPreferencesSuccess(res.data.userAskPref))      
      })
      .catch(errors => {
        dispatch(getAskPreferencesError(errors.data))
      })
  }
}


export const SAVE_ASK_PREF_REQUEST = 'SAVE_ASK_PREF_REQUEST';
export const SAVE_ASK_PREF_SUCCESS = 'SAVE_ASK_PREF_SUCCESS';
export const SAVE_ASK_PREF_ERROR = 'SAVE_ASK_PREF_ERROR';


export function saveAskPrefRequest(){
  return {
    type: SAVE_ASK_PREF_REQUEST
  }
}

export function saveAskPrefSuccess(message){
  return {
    type: SAVE_ASK_PREF_SUCCESS,
    message: message
  }
}

export function saveAskPrefError(errors){
  return {
    type: SAVE_ASK_PREF_ERROR,
    message: errors
  }
}



export function saveAskPref(data) {
  return dispatch => {
    dispatch(saveAskPrefRequest());
    return ajax.post(URL_PREFIX + `/user/save/askPref`, data)
      .then(res => {
        dispatch(saveAskPrefSuccess(res.data.message))      
      })
      .catch(errors => {
        dispatch(saveAskPrefError(errors.data.message))
      })
  }
}



export const UPDATE_ASK_PREF_REQUEST = 'UPDATE_ASK_PREF_REQUEST';
export const UPDATE_ASK_PREF_SUCCESS = 'UPDATE_ASK_PREF_SUCCESS';
export const UPDATE_ASK_PREF_ERROR = 'UPDATE_ASK_PREF_ERROR';


export function updateAskPrefRequest(){
  return {
    type: UPDATE_ASK_PREF_REQUEST
  }
}

export function updateAskPrefSuccess(message){
  return {
    type: UPDATE_ASK_PREF_SUCCESS,
    message: message
  }
}

export function updateAskPrefError(errors){
  return {
    type: UPDATE_ASK_PREF_ERROR,
    message: errors
  }
}



export function updateAskPref(id, data) {
  return dispatch => {
    dispatch(updateAskPrefRequest());
    return ajax.put(URL_PREFIX + `/user/update/askPref/${id}`, data)
      .then(res => {
        dispatch(updateAskPrefSuccess(res.data.message))      
      })
      .catch(errors => {
        dispatch(updateAskPrefError(errors.data.message))
      })
  }
}

export const GET_PROFILE_IMAGE_REQUEST = 'GET_PROFILE_IMAGE_REQUEST';
export const GET_PROFILE_IMAGE_SUCCESS = 'GET_PROFILE_IMAGE_SUCCESS';
export const GET_PROFILE_IMAGE_ERROR = 'GET_PROFILE_IMAGE_ERROR';


export function getProfileImageRequest(){
  return {
    type: GET_PROFILE_IMAGE_REQUEST
  }
}

export function getProfileImageSuccess(data){
  return {
    type: GET_PROFILE_IMAGE_SUCCESS,
    userProfile: data
  }
}

export function getProfileImageError(errors){
  return {
    type: GET_PROFILE_IMAGE_ERROR,
    message: errors
  }
}



export function getProfileImage(userId) {
  return dispatch => {
    dispatch(getProfileImageRequest());
    return ajax.get(URL_PREFIX + `/user/get/profileImage/${userId}`)
      .then(res => {
        dispatch(getProfileImageSuccess(res.data.userProfile))      
      })
      .catch(errors => {
        dispatch(getProfileImageError(errors.message))
      })
  }
}

export const GET_COVER_PHOTO_REQUEST = 'GET_COVER_PHOTO_REQUEST';
export const GET_COVER_PHOTO_SUCCESS = 'GET_COVER_PHOTO_SUCCESS';
export const GET_COVER_PHOTO_ERROR = 'GET_COVER_PHOTO_ERROR';


export function getCoverPhotoRequest(){
  return {
    type: GET_COVER_PHOTO_REQUEST
  }
}

export function getCoverPhotoSuccess(data){
  return {
    type: GET_COVER_PHOTO_SUCCESS,
    coverPhoto: data
  }
}

export function getCoverPhotoError(errors){
  return {
    type: GET_COVER_PHOTO_ERROR,
    message: errors
  }
}



export function getCoverPhoto(userId) {
  return dispatch => {
    dispatch(getCoverPhotoRequest());
    return ajax.get(URL_PREFIX + `/user/get/coverPhoto/${userId}`)
      .then(res => {
        dispatch(getCoverPhotoSuccess(res.data.coverPhoto))      
      })
      .catch(errors => {
        dispatch(getCoverPhotoError(errors.message))
      })
  }
}