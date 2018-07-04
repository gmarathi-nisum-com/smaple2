import React from 'react';
import Link from 'react-router/lib/Link'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import IndexRedirect from 'react-router/lib/IndexRedirect'
import IndexRoute from 'react-router/lib/IndexRoute'
import browserHistory from 'react-router/lib/browserHistory'
import {Provider} from 'react-redux';
import store from './store'
import {Map, toJS} from 'immutable';
import TransparentIndexPage from './Navigation/Components/TransparentIndexPage'
// Import miscellaneous routes and other requirements
import App from './App';
import NotFound from './Layout/Components/NotFound';
// Import static pages
import Home from './Layout/Components/Home';
import Contact from './Contact/Components/Contact';
import Settings from './Navigation/Components/Settings';
import CreatePage from './CreatePage/Components/CreatePage';
import {getCurrentUser, extractRoleInfo} from './Login/utils'
import Careers from './About/Components/Careers';
import Team from './About/Components/Team';
import Press from './About/Components/Press';
import Policy from './About/Components/Policy';
// import About from './About/Components/About';
// Import authentication related pages
import Login from './Login/Components/Login';
import ProfileView from './MyProfile/Components/ProfileView';
import Confirmation from './Email/Components/Confirmation';
import About from './About/Components/About';
import Register from './Register/Components/Register';
// import Facebook from './Facebook/Components/FacebookLogin';
import Logout from './Logout/Components/Logout';
import Profile from './Profile/Components/Profile';
// import UserDropdown from './Layout/Components/UserDropdown';
import ForgotPassword from './ForgotPassword/Components/ForgotPassword';
import ResetPassword from './ResetPassword/Components/ResetPassword';
import {syncHistoryWithStore} from 'react-router-redux'
// Import dashboard pages
import Dashboard from './Dashboard/Components/Dashboard';
import Search from './Search/Components/Search';
import Post from './Post/Components/Post';
import * as loginActions from './Login/actions';

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state.get('Routes').toJS()
})
    // console.log("History: ", JSON.stringify(history));
function redirectIfAuth(nextState, replace) {
    const user = getCurrentUser(store.getState())
    console.log("User state: ", JSON.stringify(store.getState()));
    if (user.get('id')) {
        replace({
            pathname: 'dashboard',
            state: { nextPathname: nextState.location.pathname}
        })
    }
}
var update = 0

function checkRoles(nextState, replace) {
        const user = getCurrentUser(store.getState())
        console.log("Role extract user: ", JSON.stringify(extractRoleInfo(user.get('role'))))
        if (!extractRoleInfo(user.get('role'))) {
            var url = window.location.href
            var refURL = ''
            let x = window.location.href.split('/')
            for(let v=5; v<x.length; v++)
            {
                refURL += x[v]
            }
            if(refURL)
            {
                if(update == 0)
                {
                    update = 1
                    store.dispatch(loginActions.setURL(refURL))
                }
            }
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            })
        }
}
const routes = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" name="Home" component={App}>
                <IndexRedirect to="home"/>
                <Route path="login" component={Login} onEnter={redirectIfAuth}/>
                <Route path="contact" component={Contact} />
                <Route path="home" component={Home} />
                <Route path="about" component={About} />
                <Route path="careers" component={Careers} />
                <Route path="press" component={Press} />
                <Route path="policy" component={Policy} />
                <Route path="team" component={Team} />
                <Route path="home" component={Home} />
                <Route path="register" component={Register} /> 
                <Route path="about" component={About} />               
                <Route path="forgotpassword" component={ForgotPassword}  onEnter={redirectIfAuth}/>
                <Route path="resetpassword/:resetToken" component={ResetPassword}/>
                <Route path="confirmation/:token" component={Confirmation} />
                <Route path="dashboard" name='Dashboard' component={Dashboard} onEnter={checkRoles}/>
                <Route path="/:id/myProfile" name='ProfileView' component={ProfileView} onEnter={checkRoles}/>
                <Route path="create-page" name='ProfileView' component={CreatePage} onEnter={checkRoles}/>
                <Route path="/:id/profile" name='Profile' component={Profile} onEnter={checkRoles}/>
                    <Route path=":loginId" name="NT" component={TransparentIndexPage} onEnter={checkRoles}>
                        <Route path="post" name='Post' component={Post} />
                        
                        <Route path="search" component={Search} />
                        <Route path="settings" component={Settings} />
                    </Route>         
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>
)
export default routes
