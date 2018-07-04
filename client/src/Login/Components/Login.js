import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { loginUser } from '../../actions/auth';
import {push} from 'react-router-redux';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as actions from '../actions';
import * as userActions from '../../Users/actions';
import config from '../../config';
import {Map, List, fromJS} from 'immutable';
import * as loginUtils from '../utils';
// import FacebookLogin from 'react-facebook-login';
import AccountCircle from 'material-ui/svg-icons/Action/account-circle';
import LoadingBar from 'react-redux-loading-bar';
import Divider from 'material-ui/Divider';
// import FacebookLogin from '../../Facebook/Components/FacebookLogin';
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class LinkedinLogin extends Component{
    constructor(props) {
        super(props)
            this.state = {
            open: false,
            message:''
    };
    this.linkedinLogin = this.linkedinLogin.bind(this)
    
    }
    
    componentDidMount(){
        (function() {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "http://platform.linkedin.com/in.js?async=true";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })();   
    }
    
    //Trigger Login for LinkedIn
    linkedinLogin = () => {
        window.IN.init({
            api_key : config.linkedinID,
            authorize: true
        });
        setTimeout(function(){
                this.getUserDetails()
            }.bind(this),1000); 
            this.setState({
                      open: true,
                      message: 'Login through Linkedin Success. Happy sharing!'
                    })  
             // this.setState({
             //          open: true,
             //          message: 'Error occured! Unable to login through Linkedin. Please try different option!'
             //        })
        // console.log( "Loaded" )
    }
    
    getUserDetails = () => {
        window.IN.User.authorize( function(){ 
            window.IN.API.Profile("me")
                .fields(["maidenName", "location", "headline", "industry ", "positions","emailAddress", "id", "firstName", "lastName", "pictureUrl", "publicProfileUrl"])
                .result(function(result) {
                    
                    // console.log(result);
                    // alert("Successfull login from linkedin : "+ result.values[0].firstName + " " + result.values[0].lastName);
                })
                .error(function(err) {
                   
                    // console.log('Import error - Error occured while importing data')
                });
        });
    }
    render(){
        return(
            
                <div>
                  <imports.Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={4000}
                    bodyStyle={myTheme.bodyStyle}
                    action="Close"
                    onRequestClose={this.handleRequestClose}
                    onActionTouchTap={this.handleRequestClose}
                    style={myTheme.snackbarfromTop}
                  />
                  <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={ () => this.linkedinLogin() }>
                    <i className="fa fa-linkedin"></i> Login with Linkedin
                  </imports.RaisedButton>
                  
                </div>
        )
    }
}

function mapStateToPropsIN(state) {  
  let authenticated = state.getIn(['Login', 'user', 'authenticate'], false);
  return {
   authenticated
  }
}

const actionsToPropsIN = {
      fbLogin: actions.fbLogin,
      push
    }

const MappedLinkedinLogin = connect(mapStateToPropsIN, actionsToPropsIN)(LinkedinLogin);


class FacebookLogin extends Component{
    constructor(props) {
    super(props);
    this.state = {
            open: false,
            message:''
    };
    this.callFacebook = this.callFacebook.bind(this)
    this.statusChangeCallback = this.statusChangeCallback.bind(this)
    
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
        // console.log(JSON.stringify(response, undefined, 2));
            this.setState({
              open: true,
              message: 'Facebook Login Success. Happy sharing!'
            })
        if (response.status === 'connected') {
            // alert( "Connected to facebook. Retriving user from fb" );
            // Logged into your app and Facebook.
            this.fetchDataFacebook();
        } else if (response.status === 'not_authorized') {
           this.setState({
              open: true,
              message: 'You are not authorized to Login using Facebook'
            })
        } else {
             this.setState({
              open: true,
              message: 'Login through facebook failed. Please try different option!'
            })
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
 handleRequestClose = () => {
      this.setState({
        open: false
      });
    };
    render(){
        return(
                
          <div style={{marginRight: 10}}>
            <imports.Snackbar
            open={this.state.open}
            message={this.state.message}
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyle}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          />
                  <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.callFacebook}>
                    <i className="fa fa-facebook"></i> Login with Facebook
                  </imports.RaisedButton>

                </div>
        )
    }
}

function mapStateToPropsFB(state) {  
  let authenticated = state.getIn(['Login', 'user', 'authenticate'], false);
  return {
   authenticated
  }
}

const actionsToPropsFB = {
      fbLogin: actions.fbLogin,
      push
    }

const MappedFacebookLogin = connect(mapStateToPropsFB, actionsToPropsFB)(FacebookLogin);



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: '',
      passwordError:'',
      error: '',
      email: '',
      password: '',
      openError: false,
      openSuccess: false
    };
     // this.responseFacebook = this.responseFacebook.bind(this)
      // this.callFacebook = this.callFacebook.bind(this)
      this.changeEmail = this.changeEmail.bind(this);
      this.changePassword = this.changePassword.bind(this);
     
  }

  static get propTypes() {
    return {
      loginId:React.PropTypes.string,
      loading: React.PropTypes.bool,  
      loginUser: React.PropTypes.func,
      fetchUsers : React.PropTypes.func,
      deleteLogoutState: React.PropTypes.func
    }
  }

  componentWillMount() {
    // if (loginUtils.extractRoleInfo(this.props.user.get('role'))) {
    //   this.props.push(loginUtils.getHomePath(this.props.user))
    // }
    console.log("Route Props: ", this.props.routes[this.props.routes.length - 1])
  }
componentDidMount(){
    // this.props.fetchUsers();
    // if(this.props.authenticated){
    //   window.location.href = `${config.CLIENT_ROOT_URL}/dashboard`;
    // }
    // this.loadFbLoginApi();
  // this.props.deleteLogoutState();
}
componentWillUnMount(){
    // this.props.fetchUsers();
    // if(this.props.authenticated){
    //   window.location.href = `${config.CLIENT_ROOT_URL}/dashboard`;
    // }
    // this.loadFbLoginApi();

    this.setState({
      openLogout: false
    })
}
componentWillReceiveProps(nextProps) {
     
  if(nextProps.success.length > 0){
    this.state.openSuccess= true
  }
  if(nextProps.errors.length > 0){
    this.state.openError= true
  }
  if(nextProps.logout){
    this.state.openLogout= true
  }
  // console.log("Datat props: ", JSON.stringify(nextProps,undefined, 2))
    // if(nextProps.errorMessage != '' && nextProps.errorMessage!= undefined){
    //   this.setState({
    //     openError: true
    //   })
    // }
  }

  handleTouchTap = () => {
    if(this.state.email == '' || this.state.email == null){
      this.setState({
      emailError: "Email cannot be empty",
      passwordError: ''
    });
    }
    else if (!emailPattern.test(this.state.email) && this.state.email.length > 0) {
      this.setState({
        emailError: "Enter a valid email",
        passwordError: ''
      });
    }
    else if(this.state.password == '' || this.state.password == null){
      this.setState({
      emailError: '',
      passwordError: "Password cannot be empty"
    });
    }else{

      this.props.loginUser(this.state.email, this.state.password);
           
    }
  };
  changeEmail(evt) {
    if(evt.target.value == '' || evt.target.value == null){
      this.setState({
      emailError: "Email cannot be empty",
      passwordError: ''
    });
    }
    else if (!emailPattern.test(evt.target.value) && evt.target.value.length > 0) {
      this.setState({
        emailError: "Enter a valid email",
        passwordError: ''
      });
    }else{
      this.setState({
        emailError: '',
        passwordError: ''
      });
    }
    this.setState({
        email: evt.target.value
      });
  }
  changePassword(evt) {
    if(evt.target.value == '' || evt.target.value == null){
      this.setState({
      emailError: "",
      passwordError: 'Password cannot be empty'
    });
    }else{
      this.setState({
        emailError: '',
        passwordError: ''
      });
    }
    this.setState({
        password: evt.target.value
      });
  }

  handleRequestClose = () => {
      this.setState({
        openSuccess: false,
        openError: false,
        openLogout: false
      });
    };
  renderLoading(){
      return (
        <imports.RefreshIndicator
        size={40}
        left={10}
        top={0}
        status="loading"
        style={{marginLeft: '50%', display: 'inline-block', position: 'relative'}}
      />
      )
  }
  render() {
   const {user, errors,loginId, loading, success, authenticated, logout} = this.props
    return (
      <div>
      {this.props.loading ? this.renderLoading() : ''}
          {this.props.logout ? <imports.Snackbar
            open={this.state.openLogout}
            message="You are Successfuly loggedout! Thanks for being part of Netext Family!"
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyle}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          />: ''}
           {this.props.success ? <imports.Snackbar
            open={this.state.openSuccess}
            message={this.props.success}
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyle}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          /> : ''}
           {this.props.errors ? <imports.Snackbar
            open={this.state.openError}
            message={this.props.errors}
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyle}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          />:''}
      <div className="module row" style={{display: 'flex'}}>
          
               <section className="section">
                <h1>Login here</h1> 
                <h3>Let your friends know your opinion about them. Happy posting!</h3>  
            <imports.TextField errorText={this.state.emailError} errorStyle={myTheme.errorStyle} underlineStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineFocusStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Email" hintText="Enter your email" value={this.state.email} onChange={this.changeEmail} name="email" /> 
            <br />
          <imports.TextField errorText={this.state.passwordError} errorStyle={myTheme.errorStyle} underlineStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineFocusStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Password" hintText="Enter your password" value={this.state.password} onChange={this.changePassword} type="password" />
          <br />
          <br />
          <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTap}>
                    {this.props.loading ? "Signing in" :'Signin'}
          </imports.RaisedButton>
          <Link style={{marginLeft:'10px', color: myTheme.green}} to="forgotpassword">Forgot Password?</Link>
          <br />
          <div style={{display: 'flex', marginBottom: 10}}>
            <span>Don't have an account?<Link to="register" style={{marginLeft:'10px', color: myTheme.green}}>Click here</Link></span>
          </div>
          
          <div className= "row" style={{display: 'flex', marginLeft: 0}}>
          <Divider style={{width: 140, marginRight: 3}} /> <h5 style={{marginTop: -7}}>OR</h5> <Divider style={{width: 140, marginLeft: 3}} />
          </div>
          <div className= "row" style={{display: 'flex', marginLeft: 0, marginTop: -10}}>
              <h5>Sign in with Social sites to personalise your experience </h5>
              
          </div>
          <div className= "row" style={{display: 'flex', marginLeft: 0}}>
              <MappedFacebookLogin />
              <MappedLinkedinLogin />

          </div>
  </section>
  <section className="section">
          <div className="feature-link-carousel-cell">
              <a href="https://www.glassdoor.com/blog/do-race-gender-play-a-role-in-salary-negotiations/" data-ga-category="homepage" data-ga-lbl="marketing-whatsnew" data-ga-action="whats-new-click">
                <img width="700" data-original="https://media.glassdoor.com/home/feature-link/reviews/iStock_81884597_MEDIUM.jpg" className="lazy lazy-loaded" src="https://media.glassdoor.com/home/feature-link/reviews/bain-and-company-office1.jpg" alt="Do Race &amp; Gender Play a Role in Salary Negotiations? A New Study Says Yes" style={{opacity: 1}}></img>
              </a>
              
            </div>
        </section>
  </div> 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    const user = loginUtils.getCurrentUser(state)
    let loginId;
    if(user.size > 0){
      loginId = user.get('id');
    }
    let loading = state.getIn(['Login', 'user', 'loading'], false);
    let error = state.getIn(['Login', 'user', 'error'], List());
    let data = state.getIn(['Login', 'user', 'data'], List());
    let authenticated = state.getIn(['Login', 'user', 'authenticate'], false);
    // console.log("data: ", JSON.stringify(data))
    let logout = state.getIn(['User', 'logout', 'status'], false);
    console.log("logout: ", logout)
    let success = ''
       if(data.size > 0){          
          success = "Login Success! Happy Posting!"
      }
    let errors=''
    if(error.size > 0){
          // console.log("error Login: ", error.get("message"))
          errors = error.get("message");
          
      }
  return {
    user,
    loginId,
    success,
    authenticated,
    loading,
    errors,
    logout
  }
}

const actionsToProps = {
      loginUser: actions.loginUser,
      deleteLogoutState: userActions.deleteLogoutState,
      push
    }


export default connect(mapStateToProps, actionsToProps)(Login);
