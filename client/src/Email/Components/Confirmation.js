import React, { Component } from 'react';
import { connect } from 'react-redux';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import {router, push} from 'react-router-redux';
import * as actions from '../actions';
import * as ResetActions from '../../ResetPassword/actions';
import {Map, List, fromJS} from 'immutable';

class Confirmation extends Component {
constructor(props) {
    super(props);
    this.state = {
      openError: false,
      openSuccess: false,
      email: '',
      open: false,
      error: ''
    };
    this.changeEmail = this.changeEmail.bind(this);
  }
static get propTypes() {
    return {
      loginId:React.PropTypes.string,
      loading: React.PropTypes.bool,  
      verifyEmail: React.PropTypes.func,
      resendToken: React.PropTypes.func
    }
  }

componentDidMount(){
  // let token = this.props.location.params.redirectParam;
  let token = this.props.params.token;
  // console.log("Email params token: ", token)
  // console.log("Email match token: ", JSON.stringify(token))
  this.props.verifyEmail(token);
}
componentWillReceiveProps(nextProps) {
  // console.log("nextProps.success", nextProps.success.length)
  // console.log("nextProps.errors", nextProps.errors.length)
  if(nextProps.success.length > 0){
    this.setState({
      openSuccess: true
    })
    // this.state.openSuccess= true
    setTimeout(() => {
      this.props.history.push("/login");
      // this.context.router.push('/login')
    }, 4000);
  }

  if(nextProps.accountVerified == 'already-verified'){
    console.log("accountVerified: ", nextProps.accountVerified)
        this.setState({
      openError: true
    })
    // this.state.openError= true
    setTimeout(() => {
      // this.context.router.push('/login')
      this.props.history.push("/login");
    }, 4000);
  }

   if(nextProps.accountVerified == 'not-verified'){
    // setTimeout(() => {
    //   // this.context.router.push('/login')
    //   this.props.history.push("/login");
    // }, 4000);
    this.setState({
      openError: true
    })
    // this.state.openError= true
  }

      if(nextProps.resendSuccess.length > 0){
        this.setState({
          openSuccess: true
        })
        this.state.openSuccess= true
      }

      if(nextProps.resendError.length > 0){
        console.log("Error length: ", nextProps.resendError.length)
        this.setState({
          openError: true
        })
        // this.state.openError= true
        setTimeout(() => {
        // this.context.router.push('/login')
        this.props.history.push("/login");
      }, 4000);
      }
}

  changeEmail(evt) {
    this.setState({
      email: evt.target.value
    });
  }
  handleTouchTapResend = () => {
      const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(this.state.email == '' || this.state.email == null){
        this.setState({
        error: "Email cannot be empty",
        open: true
      });
      }
      else if (!emailPattern.test(this.state.email) && this.state.email.length > 0) {
        this.setState({
          error: "Enter a valid email",
          open: true
        });
      }else{
      this.setState({
        open: false
      });
      this.props.resendToken(this.state.email);
    }
  };

  handleRequestClose = () => {
      this.setState({
        open: false,
        openError: false,
        openSuccess: false
      });
    };
  render() {
    const {error, success, loading, accountVerified, resendLoading, resendData, resendSuccess, resendError} = this.props; 

    return (
      <div>
          {this.state.open ? <imports.Snackbar
            open={this.state.open}
            message={this.state.error}
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyle}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          /> : ''}
           {this.props.success ?<imports.Snackbar
            open={this.state.openSuccess}
            message={this.props.success}
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyle}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          />:''}
          {this.props.error ? <imports.Snackbar
            open={this.state.openError}
            message={this.props.error}
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyle}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          />:''}
          {this.props.resendError ? <imports.Snackbar
            open={this.state.openError}
            message={this.props.resendError}
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyle}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          />:''}
          {this.props.accountVerified == 'already-verified' && (
            <div>
              <h1>Your account was already verified!</h1>
              <h3>You will be redirected to Login page. Please login!</h3>
            </div>)} 
            {this.props.accountVerified == 'not-verified' && (
              <div>
                <h1>Your token may have expired! Please request a new one</h1>
                <imports.TextField underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Email" hintText="Enter your email" value={this.state.email} onChange={this.changeEmail} name="email" /> 
                <br />
                <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTapResend}>
                {this.props.resendLoading ? 'Resending token' : 'Resend token'}
                </imports.RaisedButton>
              </div>
            )}
          {this.props.resendSuccess && (
              <div>
                <h1>A verification email has been successfully sent!</h1>
                <h3>Please check your email to activate your account!</h3>
              </div>
            )}
            {this.props.resendError && (
              <div>
                <h1>{this.props.resendError}</h1>
                <h3>You will be redirected to Login page!</h3>
              </div>
            )}
            {this.props.success && (
              <div>
                <h1>Your account has been verified successfully!</h1>
                <h3>You will be redirected to Login page. Please login!</h3>
              </div>
            )}
        </div>
    );
  }
}

function mapStateToProps(state) {
  let loading = state.getIn(['Email', 'verify', 'loading'], false)
  let data = state.getIn(['Email', 'verify', 'success'], List())
  let success = '';
  let accountVerified = '';
  let error = '';
   if(data.size > 0){
      success = data.get("message");
  }
  console.log("confirmation data: ", JSON.stringify(data));
  let errors = state.getIn(['Email', 'verify', 'errors'], List())
  if(errors.size > 0){
      error = errors.get("message");
      if(errors.get("type") == 'already-verified'){
        accountVerified = 'already-verified';
      }
      if(errors.get("type") == 'not-verified'){
        accountVerified = 'not-verified';
      }
  }else{
    error = ''
  }

  let resendLoading = state.getIn(['ResetPassword', 'resendToken', 'loading'], false)
  let resendData = state.getIn(['ResetPassword', 'resendToken', 'success'], List())
  let resendSuccess = '';
  let resendError = '';
   if(resendData.size > 0){
      resendSuccess = resendData.get("message");
      success = '';
      accountVerified = '';
      error = '';
  }
  console.log("resend success: ", JSON.stringify(resendSuccess));
  let resendErrors = state.getIn(['ResetPassword', 'resendToken', 'errors'], List())
  if(resendErrors.size > 0){
      console.log("Resend failed: ", resendErrors.get("message"))
      resendError = resendErrors.get("message");
      success = '';
      accountVerified = '';
      error = '';
  }else{
    resendError = ''
  }
  return {
    error,
    success,
    loading,
    accountVerified, resendLoading, resendData, resendSuccess, resendError
  };
}

const actionsToProps = {
      verifyEmail: actions.verifyEmail,
      resendToken: ResetActions.resendToken,
      push
    }

export default connect(mapStateToProps, actionsToProps)(Confirmation);
