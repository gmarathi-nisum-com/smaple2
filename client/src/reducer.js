import {
    combineReducers
} from 'redux-immutable'
import {Login} from './Login/reducer'
import {Register} from './Register/reducer'
import {Dashboard} from './Dashboard/reducer'
import {ForgotPassword} from './ForgotPassword/reducer'
import {ResetPassword} from './ResetPassword/reducer'
import {Logout} from './Logout/reducer'
import {Layout} from './Layout/reducer'
import {Contact} from './Contact/reducer'
import {Settings} from './Navigation/reducer'
import {Post} from './Post/reducer'
import {Search} from './Search/reducer'
import {Profile} from './Profile/reducer'
import {CreatePage} from './CreatePage/reducer'
import User from './Users/reducer'
import {Email} from './Email/reducer'
import {MyProfile} from './MyProfile/reducer'
import {fromJS} from 'immutable'
import {LOCATION_CHANGE} from 'react-router-redux'
const initialState = fromJS({
  locationBeforeTransitions: null
})

function Routes(state = initialState, { type, payload } = {}) {
  if (type === LOCATION_CHANGE) {
    return state.merge({locationBeforeTransitions: fromJS(payload)})
  }
  return state
}

const appReducer = combineReducers({
  Login,
  Routes,
  Register,
  ForgotPassword,
  Contact,
  Logout,
  Search,
  User,
  Settings,
  Email,
  ResetPassword,
  MyProfile,
  CreatePage,
  Profile,
  Post
  // Dashboard,

  // ResetPassword,
  // Logout,
  // Post,
  // Layout,
  // Search,
  // User
})


const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT_SUCCESS') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
