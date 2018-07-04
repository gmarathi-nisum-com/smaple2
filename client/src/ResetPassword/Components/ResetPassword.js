import React, { Component } from 'react';
import { connect } from 'react-redux';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import {push} from 'react-router-redux';
import * as actions from '../actions';
import {Map, List, fromJS} from 'immutable';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: '',
      password: '',
      cPassword: '',
      openError: false,
      openSuccess: false,
      email: ''
    };
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
  }

  componentWillReceiveProps(nextProps) {
     if(nextProps.success.length > 0){
        this.state.openSuccess= true
      }
      if(nextProps.resendSuccess.length > 0){
        this.state.openSuccess= true
      }
      if(nextProps.error.length > 0){
        this.state.openError= true
      }
      if(nextProps.resendError.length > 0){
        this.state.openError= true
      }
  }
 static contextTypes = {
    router: React.PropTypes.object,
    loading: React.PropTypes.bool,  
    resetPassword: React.PropTypes.func,
    resendToken: React.PropTypes.func,
    loginId:React.PropTypes.string
  }

  componentWillMount() {
    // if (this.props.authenticated) {
    //   this.context.router.push('/dashboard');
    // }
  }

  componentWillUpdate(nextProps) {
    // if (nextProps.authenticated) {
    //   this.context.router.push('/dashboard');
    // }
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

  handleTouchTap = () => {
    if(this.state.password == '' || this.state.password == null){
      this.setState({
      error: "Password cannot be empty",
      open: true
    });
    }else if(this.state.cPassword == '' || this.state.cPassword == null){
      this.setState({
      error: "Confirm Password cannot be empty",
      open: true
    });
    }
     else if(this.state.password != this.state.cPassword){
      this.setState({
      error: "Password and Confirm Password should be same",
      open: true
    });
    }
    else{
      this.setState({
        open: false
      });
      const resetToken = this.props.params.resetToken;
      let data = {
        password: this.state.password
      }
      this.props.resetPassword(resetToken, data);
    }
  };

  changePassword(evt) {
    this.setState({
        password: evt.target.value
      });
  }

    changeConfirmPassword(evt) {
    this.setState({
        cPassword: evt.target.value
      });
  }

  changeEmail(evt) {
    this.setState({
        email: evt.target.value
      });
  }
  handleRequestClose = () => {
      this.setState({
        open: false,
        openError: false,
        openSuccess: false
      });
    };

  render() {
       const {loading, data, success, error, tokenExpired, resendLoading, resendData, resendSuccess, resendError } = this.props; 
    return (
      <div className="ad-create-page" >
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
          
           {this.props.message ? <imports.Snackbar
            open={this.state.openSuccess}
            message={this.props.message}
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyleSuccess}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          /> : ''}
          
          {this.props.errorMessage ? <imports.Snackbar
            open={this.state.openError}
            message={this.props.error}
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyle}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          /> : ''}
          
          {!this.props.tokenExpired ? (<div><h1>Reset Your Password</h1>          
          
        <imports.TextField underlineStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Password" hintText="Enter your password" value={this.state.password} onChange={this.changePassword} type="password" /> 
          
            <br />
          
        <imports.TextField underlineStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Confirm Password" hintText="Enter same password again" value={this.state.cPassword} onChange={this.changeConfirmPassword} type="password" />
        
          <br />
        
          
        <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTap}>
            {this.props.loading ? 'Reseting' : 'Reset'}
          </imports.RaisedButton></div>) : 
          (
            <div>
              <h1>Your token has expired! Please request a new one</h1>
              <imports.TextField underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Email" hintText="Enter your email" value={this.state.email} onChange={this.changeEmail} name="email" /> 
              <br />
              <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTapResend}>
              {this.props.resendLoading ? 'Resending token' : 'Resend token'}
              </imports.RaisedButton>
            </div>
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  let loading = state.getIn(['ResetPassword', 'token', 'loading'], false)
  let data = state.getIn(['ResetPassword', 'token', 'success'], List())
  let success = '';
  let error = '';
  let tokenExpired = false;
   if(data.size > 0){
      success = data.get("message");
  }
  console.log("reset success: ", JSON.stringify(success));
  let errors = state.getIn(['ResetPassword', 'token', 'errors'], List())
  if(errors.size > 0){
      error = errors.get("error");
      if(errors.get("status") == 400){
        tokenExpired = true;
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
  }
  console.log("resend success: ", JSON.stringify(resendSuccess));
  let resendErrors = state.getIn(['ResetPassword', 'resendToken', 'errors'], List())
  if(resendErrors.size > 0){
      resendError = resendErrors.get("error");
  }else{
    resendError = ''
  }
  console.log("resend errors: ", JSON.stringify(resendErrors));
  return { loading, data, success, error, tokenExpired, resendLoading, resendData, resendSuccess, resendError };
}
const actionsToProps = {
      resetPassword: actions.resetPassword,
      resendToken: actions.resendToken,
      push
    }

export default connect(mapStateToProps, actionsToProps)(ResetPassword);
