import React, { Component } from 'react';
import { connect } from 'react-redux';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import {push} from 'react-router-redux';
import * as actions from '../actions';
import {Map, List, fromJS} from 'immutable';

class Contact extends Component {
constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: '',
      email: '',
      firstName: '',
      lastName: '',
      subject: '',
      message: '',
      openError: false,
      openSuccess: false
    };
  }
static get propTypes() {
    return {
      loginId:React.PropTypes.string,
      loading: React.PropTypes.bool,  
      sendContactForm: React.PropTypes.func
    }
  }

componentDidMount(){

}
componentWillReceiveProps(nextProps) {
  // console.log("nextProps.success", nextProps.success.length)
  // console.log("nextProps.errors", nextProps.errors.length)
  if(nextProps.success.length > 0){
    this.state.openSuccess= true
  }
  if(nextProps.errors.length > 0){
    this.state.openError= true
  }
  }

handleTouchTap = () => {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(this.state.firstName == '' || this.state.firstName == null){
      this.setState({
      error: "First name cannot be empty",
      open: true
    });
    }
    else if(this.state.lastName == '' || this.state.lastName == null){
      this.setState({
      error: "Last name cannot be empty",
      open: true
    });
    }
    else if(this.state.email == '' || this.state.email == null){
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
    }
    else if(this.state.subject == '' || this.state.subject == null){
      this.setState({
      error: "Please enter subject",
      open: true
    });
    }else if(this.state.message == '' || this.state.message == null){
      this.setState({
      error: "Please enter your message",
      open: true
    });
    }else{
      this.setState({
        open: false
      });
      this.props.sendContactForm(this.state.firstName, this.state.lastName, this.state.email, this.state.subject, this.state.message);
    }
  };
    

  changeEmail = (evt) => {
    this.setState({
        email: evt.target.value
      });
  }

  changeFirstName = (evt) => {
    this.setState({
        firstName: evt.target.value
      });
  }

  changeLastName = (evt) => {
    this.setState({
        lastName: evt.target.value
      });
  }

   changeSubject = (evt) => {
    this.setState({
        subject: evt.target.value
      });
  }

   changeMessage = (evt) => {
    this.setState({
        message: evt.target.value
      });
  }
  handleRequestClose = () => {
      this.setState({
        open: false,
        openError: false,
        openSuccess: false
      });
    };
  renderLoading(){
    <imports.RefreshIndicator
    size={50}
    left={70}
    top={0}
    loadingColor={myTheme.loaderColor}
    status="loading"
    style={myTheme.refresh}
  />
  }

  render() {
    const {errors, success, loading} = this.props; 

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
          />: ''}
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
          
          
                <div className="ss" style={{textAlign: 'center'}}>
                <h2>Contact Us</h2>
                 <h3>Fill in your details below and submit</h3>
                  <imports.TextField underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="First name" hintText="Enter your first name" value={this.state.firstName} onChange={this.changeFirstName} name="firstName" />
                  <br />
                  <imports.TextField underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Last name" hintText="Enter your lastname" value={this.state.lastName} onChange={this.changeLastName} name="lastName" />
                <br />
                  <imports.TextField underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Email" hintText="Enter your email" value={this.state.email} onChange={this.changeEmail} name="email" /> 
                <br />
                  <imports.TextField underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Subject" hintText="Enter your Subject" value={this.state.subject} onChange={this.changeSubject} />
                <br />
                  <imports.TextField underlineStyle={myTheme.underlineStyle} multiLine={true} underlineFocusStyle={myTheme.underlineStyle} textareaStyle={myTheme.inputStyleText} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Message" hintText="Enter your message" value={this.state.message} onChange={this.changeMessage} />
                <br />
                <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTap}>
                          {this.props.loading ? "Sending" :"Send"}
                </imports.RaisedButton>
</div>

        </div>
    );
  }
}

function mapStateToProps(state) {
  let loading = state.getIn(['Contact', 'contact', 'loading'], false)
  let data = state.getIn(['Contact', 'contact', 'success'], List())
  let success = ''
   if(data.size > 0){
      success = data.get("message");
  }
  console.log("success: ", JSON.stringify(success));
  let errors = state.getIn(['Contact', 'contact', 'errors'], List())
  if(errors.size > 0){
      errors = errors.get("error");
  }else{
    errors = ''
  }
  return {
    errors,
    success,
    loading
  };
}

const actionsToProps = {
      sendContactForm: actions.sendContactForm,
      push
    }

export default connect(mapStateToProps, actionsToProps)(Contact);
