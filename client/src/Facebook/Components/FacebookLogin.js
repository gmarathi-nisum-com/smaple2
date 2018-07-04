import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import myTheme from '../../common/theme';
import config from '../../config';
import * as actions from '../../Login/actions';
import {push} from 'react-router-redux';
class FacebookLogin extends Component{
    constructor(props) {
    super(props);
    this.state = {
    };
    this.callFacebook = this.callFacebook.bind(this)
  }

  static get propTypes() {
    return {
      fbLogin : React.PropTypes.func
    }
  }
    componentDidMount(){
        // Load the required SDK asynchronously for facebook, google and linkedin
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
        window.fbAsyncInit = function() {
            window.FB.init({
              appId      : config.facebookID,
              cookie     : true,  // enable cookies to allow the server to access the session
              xfbml      : true,  // parse social plugins on this page
              version    : 'v2.8' // use version 2.1
            });
        };
    }

     callFacebook = () => {        
        window.FB.login(
            function(resp){
                this.statusChangeCallback(resp);
            }.bind(this),{ scope : 'email,user_friends,public_profile' });
    }
    
    statusChangeCallback(response) {
        // console.log('statusChangeCallback');
        console.log(JSON.stringify(response, undefined, 2));
        if (response.status === 'connected') {
            // alert( "Connected to facebook. Retriving user from fb" );
            // Logged into your app and Facebook.
            this.fetchDataFacebook();
        } else if (response.status === 'not_authorized') {
            // console.log('Import error', 'Authorize app to import data', 'error')
        } else {
            // console.log('Import error', 'Error occured while importing data', 'error')
        }
    }
    
    fetchDataFacebook = () => {
        // console.log('Welcome!  Fetching your information.... ');

        window.FB.api('/me', function(user) {
            actions.fbLogin(user);
            // console.log( user );
            console.log('Successful login from facebook : ' + user.name);
            console.log('Successful login from facebook : ' + user.email);
            // alert( 'Successful login for: ' + user.name );
        });
    }

    render(){
        return(
                <div>
                  <h5 style={{marginRight: 10}}>Sign in with Facebook to personalise your experience </h5>
                  <button type="button" onClick={this.callFacebook} style={myTheme.buttonStyle} className="btn btn-md btn-fb"><i className="fa fa-facebook"></i> Login with Faceboook</button>
                </div>
        )
    }
}

function mapStateToProps(state) {  
  let authenticated = state.getIn(['Login', 'user', 'authenticate'], false);
  return {
   authenticated
  }
}

const actionsToProps = {
      fbLogin: actions.fbLogin,
      push
    }

export default connect(mapStateToProps, actionsToProps)(FacebookLogin);