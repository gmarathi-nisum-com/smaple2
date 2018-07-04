import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export function MyProfile(state = Map(), action) {
	switch(action.type) {
    case actions.SAVE_USER_PROFILE_IMAGE_REQUEST:
      return state.setIn(['user','profileUpload', 'loading'], true)
                  .deleteIn(['user','profileUpload', 'errors'])
                  .deleteIn(['user','profileUpload', 'success'])
   
    case actions.SAVE_USER_PROFILE_IMAGE_SUCCESS: {
      return state
        .setIn(['user','profileUpload', 'loading'], false)
        .setIn(['user','profileUpload', 'success'], action.message)

    }
    case actions.SAVE_USER_PROFILE_IMAGE_ERROR: {
     return state
      .setIn(['user','profileUpload', 'loading'], false)
      .setIn(['user','profileUpload', 'errors'], action.message)
    }

    case actions.SAVE_USER_COVER_PHOTO_REQUEST:{
      return state.setIn(['coverPhoto', 'loading'], true)
                  .deleteIn(['coverPhoto', 'errors'])
                  .deleteIn(['coverPhoto', 'success'])
    }
   
    case actions.SAVE_USER_COVER_PHOTO_SUCCESS: {
      return state
        .setIn(['coverPhoto', 'loading'], false)
        .setIn(['coverPhoto', 'success'], action.message)
    }
    case actions.SAVE_USER_COVER_PHOTO_ERROR: {
     return state
      .setIn(['coverPhoto', 'loading'], false)
      .setIn(['coverPhoto', 'errors'], action.message)
    }


	case actions.SAVE_USER_FAV_REQUEST:
      return state.setIn(['user','fav', 'loading'], true)
      .deleteIn(['user','fav', 'errors'])
      .deleteIn(['user','fav', 'success'])
    case actions.SAVE_USER_FAV_SUCCESS: {
      // const loginId = action.user.id
      return state
      .setIn(['user','fav', 'success'], action.message)
      .setIn(['user','fav', 'loading'], false)
    }
    case actions.SAVE_USER_FAV_ERROR: {
     return state
      .setIn(['user','fav', 'errors'], action.message)
      .setIn(['user','fav', 'loading'], false)
    }

    case actions.UPDATE_USER_FAV_REQUEST:
      return state.setIn(['user','updatefav', 'loading'], true)
      .deleteIn(['user','updatefav', 'errors'])
      .deleteIn(['user','updatefav', 'success'])
       .deleteIn(['user','getFromStore'])
    case actions.UPDATE_USER_FAV_SUCCESS: {
      // const loginId = action.user.id
      return state
      .setIn(['user','updatefav', 'loading'], false)
      .setIn(['user','updatefav', 'success'], action.message)
    }
    case actions.UPDATE_USER_FAV_ERROR: {
     return state
      .setIn(['user','updatefav', 'loading'], false)
      .setIn(['user','updatefav', 'errors'], action.message)
    }

    case actions.GET_USER_FAV_REQUEST:
      return state.setIn(['getUser','fav', 'loading'], true)
      .deleteIn(['getUser','fav', 'errors'])
      .deleteIn(['getUser','fav', 'success'])
    case actions.GET_USER_FAV_SUCCESS: {
      // const loginId = action.user.id
       console.log("userFavData..... from reducer", action.data)
      return state
      .setIn(['getUser','fav', 'success'], fromJS(action.data))
      .setIn(['getUser','fav', 'loading'], false)
    }
    case actions.GET_USER_FAV_ERROR: {
     return state
      .setIn(['getUser','fav', 'errors'], action.message)
      .setIn(['getUser','fav', 'loading'], false)
    }

    case actions.DELETE_CHIP_USER_FAV_REQUEST:
      return state.setIn(['user','deleteFav', 'loading'], true)
      .deleteIn(['user','deleteFav', 'errors'])
      .deleteIn(['user','deleteFav', 'success'])
    case actions.DELETE_CHIP_USER_FAV_SUCCESS: {
      // const loginId = action.user.id
      return state
      .setIn(['user','deleteFav', 'success'], action.message)
      .setIn(['user','deleteFav', 'loading'], false)
    }
    case actions.DELETE_CHIP_USER_FAV_ERROR: {
     return state
      .setIn(['user','deleteFav', 'errors'], action.message)
      .setIn(['user','deleteFav', 'loading'], false)
    }

    case actions.SAVE_ABOUT_ME_REQUEST:
      return state.setIn(['user','aboutMe', 'loading'], true)
      .deleteIn(['user','aboutMe', 'errors'])
      .deleteIn(['user','aboutMe', 'success'])
    case actions.SAVE_ABOUT_ME_SUCCESS: {
      // const loginId = action.user.id
      return state
      .setIn(['user','aboutMe', 'loading'], false)
      .setIn(['user','aboutMe', 'success'], action.message)
    }
    case actions.SAVE_ABOUT_ME_ERROR: {
     return state
      .setIn(['user','aboutMe', 'loading'], false)
      .setIn(['user','aboutMe', 'errors'], action.message)
    }

     case actions.GET_ABOUT_ME_REQUEST:
      return state.setIn(['getUser','aboutMe', 'loading'], true)
      .deleteIn(['getUser','aboutMe', 'errors'])
      .deleteIn(['getUser','aboutMe', 'success'])
    case actions.GET_ABOUT_ME_SUCCESS: {
      // const loginId = action.user.id
      console.log("Data from reducer: ", action.data)
      return state
      .setIn(['getUser','aboutMe', 'loading'], false)
      .setIn(['getUser','aboutMe', 'success'], fromJS(action.data))
    }
    case actions.GET_ABOUT_ME_ERROR: {
     return state
      .setIn(['getUser','aboutMe', 'loading'], false)
      .setIn(['getUser','aboutMe', 'errors'], action.message)
    }
    
  case actions.UPDATE_ABOUT_ME_REQUEST:
      return state.setIn(['user','updateAboutme', 'loading'], true)
      .deleteIn(['user','updateAboutme', 'errors'])
      .deleteIn(['user','updateAboutme', 'success'])
    case actions.UPDATE_ABOUT_ME_SUCCESS: {
      // const loginId = action.user.id
      return state
      .setIn(['user','updateAboutme', 'loading'], false)
      .setIn(['user','updateAboutme', 'success'], action.message)
    }
    case actions.UPDATE_ABOUT_ME_ERROR: {
     return state
      .setIn(['user','updateAboutme', 'loading'], false)
      .setIn(['user','updateAboutme', 'errors'], action.message)
    }

    case actions.SAVE_TO_STORE_REQUEST: {
      console.log("data from reducer store: ", action.data)
     return state
      .setIn(['user','getFromStore'], fromJS(action.data))
    }


    case actions.GET_ASK_PREFERENCES_REQUEST:
      return state.setIn(['askPreferences', 'loading'], true)
      .deleteIn(['askPreferences', 'errors'])
      .deleteIn(['askPreferences', 'success'])
    case actions.GET_ASK_PREFERENCES_SUCCESS: {
      // const loginId = action.user.id
      console.log("Data from reducer: ", action.data)
      return state
      .setIn(['askPreferences', 'loading'], false)
      .setIn(['askPreferences', 'success'], fromJS(action.data))
    }
    case actions.GET_ASK_PREFERENCES_ERROR: {
     return state
      .setIn(['askPreferences', 'loading'], false)
      .setIn(['askPreferences', 'errors'], action.message)
    }

    case actions.SAVE_ASK_PREF_REQUEST:
      return state.setIn(['saveAskpref', 'loading'], true)
      .deleteIn(['saveAskpref', 'errors'])
      .deleteIn(['saveAskpref', 'success'])
    case actions.SAVE_ASK_PREF_SUCCESS: {
      // const loginId = action.user.id
      return state
      .setIn(['saveAskpref', 'loading'], false)
      .setIn(['saveAskpref', 'success'], action.message)
    }
    case actions.SAVE_ASK_PREF_ERROR: {
     return state
      .setIn(['saveAskpref', 'loading'], false)
      .setIn(['saveAskpref', 'errors'], action.message)
    }

    case actions.UPDATE_ASK_PREF_REQUEST:
      return state.setIn(['updateAskpref', 'loading'], true)
      .deleteIn(['updateAskpref', 'errors'])
      .deleteIn(['updateAskpref', 'success'])
    case actions.UPDATE_ASK_PREF_SUCCESS: {
      // const loginId = action.user.id
      return state
      .setIn(['updateAskpref', 'loading'], false)
      .setIn(['updateAskpref', 'success'], action.message)
    }
    case actions.UPDATE_ASK_PREF_ERROR: {
     return state
      .setIn(['updateAskpref', 'loading'], false)
      .setIn(['updateAskpref', 'errors'], action.message)
    }

    case actions.GET_PROFILE_IMAGE_REQUEST:
    console.log("check...")
      return state.setIn(['profileImage', 'loading'], true)
      .deleteIn(['profileImage', 'errors'])
      .deleteIn(['profileImage', 'success'])
    case actions.GET_PROFILE_IMAGE_SUCCESS: {
      // const loginId = action.user.id

      return state
      .setIn(['profileImage', 'loading'], false)
      .setIn(['profileImage', 'success'], fromJS(action.userProfile))
    }
    case actions.GET_PROFILE_IMAGE_ERROR: {
     return state
      .setIn(['profileImage', 'loading'], false)
      .setIn(['profileImage', 'errors'], action.message)
    }

    case actions.GET_COVER_PHOTO_REQUEST:
    console.log("check...")
      return state.setIn(['getCoverPhoto', 'loading'], true)
      .deleteIn(['getCoverPhoto', 'errors'])
      .deleteIn(['getCoverPhoto', 'success'])
    case actions.GET_COVER_PHOTO_SUCCESS: {
      // const loginId = action.user.id

      return state
      .setIn(['getCoverPhoto', 'loading'], false)
      .setIn(['getCoverPhoto', 'success'], fromJS(action.coverPhoto))
    }
    case actions.GET_COVER_PHOTO_ERROR: {
     return state
      .setIn(['getCoverPhoto', 'loading'], false)
      .setIn(['getCoverPhoto', 'errors'], action.message)
    }

	  default:
	      return state
	}
}