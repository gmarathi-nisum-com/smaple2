import React, { Component } from 'react';
import { connect } from 'react-redux';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import {push} from 'react-router-redux';
import * as actions from '../actions';
import {Map, List, fromJS} from 'immutable';
import { Link } from 'react-router';
import moment from 'moment';

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pwdPattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

class Register extends Component {
  constructor(props) {
    super(props);
    const dateYesterday = new Date();
  dateYesterday.setDate(dateYesterday.getDate() - 1);
    this.state = {
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: '',
      genderError:'',
      dobError:'',
      firstName: '',
      lastName: '',
      password: '',
      sex: '',
      openError: false,
      openSuccess: false,
      dob: null,
      dateYesterday: dateYesterday,
      completed: 0
    };
  }
static get propTypes() {
    return {
      loginId:React.PropTypes.string,
      loading: React.PropTypes.bool,  
      registerUser: React.PropTypes.func
    }
  }

componentDidMount(){

}
componentWillReceiveProps(nextProps) {
  // console.log("nextProps.success", nextProps.success.length)
  console.log("nextProps.errors", nextProps.error.length)

  if(nextProps.success.length > 0){
    this.state.openSuccess= true
    // this.context.router.push('/login')
  }
  if(nextProps.error.length > 0){
    this.state.openError= true
  }
  }

handleTouchTap = () => {
    
  if(this.state.firstName == '' || this.state.firstName == null){
      this.setState({
      firstNameError: "First name cannot be empty"
    });
    }
    else if(this.state.lastName == '' || this.state.lastName == null){
      this.setState({
      lastNameError: "Last name cannot be empty"
    });
    }
    else if(this.state.email == '' || this.state.email == null){
      this.setState({
      emailError: "Email cannot be empty"
    });
    }
    else if (!emailPattern.test(this.state.email) && this.state.email.length > 0) {
      this.setState({
        emailError: "Enter a valid email"
      });
    }
    else if (!this.state.password.match(pwdPattern) && this.state.password.length > 0) {
      this.setState({
        passwordError: "Password should contain 1 lowercase, 1 uppercase letter, 1 numeric digit, and 1 special character"
      });
    }
    else if(this.state.password == '' || this.state.password == null){
      this.setState({
      passwordError: "Password cannot be empty"
    });
    }
    else if(this.state.sex == '' || this.state.sex == null){
      this.setState({
      genderError: "Please select your gender"
    });
    }else if(this.state.dob == null || this.state.sex == undefined){
      this.setState({
      dobError: "Please select your Date Of Birth"
    });
    }else{
      
      let data = {};
      let dateObj = new Date(this.state.dob);
      let momentObj = moment(dateObj);
      let momentString = momentObj.format('YYYY-MM-DD');
      data.firstName = this.state.firstName;
      data.lastName = this.state.lastName;
      data.email = this.state.email;
      data.password = this.state.password;
      data.sex = this.state.sex;
      data.dob = momentString;
      this.props.registerUser(data);
    }
  };
  
    
  changeDateOfBirth = (evt, date) => {
    if(date == null || date == undefined){
      this.setState({
        passwordError: "",
        emailError: '',
        firstNameError:'',
        lastNameError:'',
        genderError: '',
        dobError: 'Please select your date of birth'
      });
    }else{
      this.setState({
        passwordError: "",
        emailError: '',
        firstNameError:'',
        lastNameError:'',
        genderError: '',
        dobError: ''
      });
    }
    this.setState({
        dob: date
      });
  }
  changeEmail = (evt) => {
    if(evt.target.value == '' || evt.target.value == null){
      this.setState({
      emailError: "Email cannot be empty",
      passwordError: '',
      firstNameError:'',
      lastNameError:'',
      genderError: '',
      dobError: ''

    });
    }
    else if (!emailPattern.test(evt.target.value) && evt.target.value.length > 0) {
      this.setState({
        emailError: "Enter a valid email",
        passwordError: '',
        firstNameError:'',
        lastNameError:'',
        genderError: '',
      dobError: ''
      });
    }else{
      this.setState({
        emailError: '',
        passwordError: '',
        firstNameError:'',
        lastNameError:'',
        genderError: '',
        dobError: ''
      });
    }
    this.setState({
        email: evt.target.value
      });
  }

  changeFirstName = (evt) => {
    if(evt.target.value == '' || evt.target.value == null){
      this.setState({
        firstNameError: "First name cannot be empty",
        emailError: '',
        passwordError: '',
        lastNameError:'',
        genderError: '',
        dobError: ''
      });
    }else{
      this.setState({
        firstNameError: "",
        emailError: '',
        passwordError: '',
        lastNameError:'',
        genderError: '',
        dobError: ''
      });
    }
    this.setState({
        firstName: evt.target.value
      });
  }

  changeLastName = (evt) => {
    if(evt.target.value == '' || evt.target.value == null){
      this.setState({
        lastNameError: "Last name cannot be empty",
        emailError: '',
        passwordError: '',
        firstNameError:'',
        genderError: '',
        dobError: ''
      });
    }else{
      this.setState({
        lastNameError: "",
        emailError: '',
        passwordError: '',
        firstNameError:'',
        genderError: '',
        dobError: ''
      });
    }
    this.setState({
        lastName: evt.target.value
      });
  }
  changePassword = (evt) => {
    if(evt.target.value == '' || evt.target.value == null){
      this.setState({
      passwordError: "Password cannot be empty",
      emailError: '',
      firstNameError:'',
      lastNameError:'',
      genderError: '',
      dobError: ''
    });
    }else if (!evt.target.value.match(pwdPattern) && evt.target.value.length > 0) {
      this.setState({
        passwordError: "Password should contain 1 lowercase, 1 uppercase letter, 1 numeric digit, and 1 special character",
        emailError: '',
        firstNameError:'',
        lastNameError:'',
        genderError: '',
        dobError: ''
      });
    }else{
      this.setState({
        passwordError: "",
        emailError: '',
        firstNameError:'',
        lastNameError:'',
        genderError: '',
        dobError: ''
      });
    }
    
    this.setState({
        password: evt.target.value
      });
  }

  changeSex = (evt) => {
    if(evt.target.value == '' || evt.target.value == null){
      this.setState({
        passwordError: "",
        emailError: '',
        firstNameError:'',
        lastNameError:'',
        genderError: 'Please select your gender',
        dobError: ''
      });
    }else{
      this.setState({
        passwordError: "",
        emailError: '',
        firstNameError:'',
        lastNameError:'',
        genderError: '',
        dobError: ''
      });
    }
    this.setState({
        sex: evt.target.value
      });
  }
  handleRequestClose = () => {
      this.setState({
        open: false,
        openError: false,
        openSuccess: false
      });
    };

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

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
    const {error, success, loading} = this.props; 
    let DateTimeFormat;
    return (
      <div>
        {this.props.loading ? this.renderLoading() : ''}
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
        <div className="module row" style={{display: 'flex'}}>
          <section className="section">
                <h1>Create an account</h1> 
                <h3>It's free and always will be!</h3>  
            <imports.TextField errorText={this.state.firstNameError} errorStyle={myTheme.errorStyle} underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="First name" hintText="Enter your first name" value={this.state.firstName} onChange={this.changeFirstName} name="firstName" />
            <br />
            <imports.TextField errorText={this.state.lastNameError} errorStyle={myTheme.errorStyle} underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Last name" hintText="Enter your lastname" value={this.state.lastName} onChange={this.changeLastName} name="lastName" />
            <br />
            <imports.TextField errorText={this.state.emailError} errorStyle={myTheme.errorStyle} underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Email" hintText="Enter your email" value={this.state.email} onChange={this.changeEmail} name="email" /> 
            <br />
          <imports.TextField errorText={this.state.passwordError} errorStyle={myTheme.errorStyle} underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Password" hintText="Enter your password" value={this.state.password} onChange={this.changePassword} type="password" />
          <br />
        <imports.RadioButtonGroup name="gender" style={{ marginTop: 20, display: 'flex' }} onChange={this.changeSex}>
          <imports.RadioButton
            value='male'
            name="male"
            label='Male'
            style={{ width: 'auto', marginRight: '15px' }}
            labelStyle={myTheme.labelStyle}
            inputStyle={myTheme.inputStyle}
            iconStyle={myTheme.iconStyle}
            />
          <imports.RadioButton
            value='female'
            label='Female'
            name='female'
            style={{ width: 'auto' }}
            labelStyle={myTheme.labelStyle}
            inputStyle={myTheme.inputStyle}
            iconStyle={myTheme.iconStyle}
            />
        </imports.RadioButtonGroup>
          <imports.DatePicker dialogContainerStyle={{position: 'absolute'}} errorText={this.state.dobError} errorStyle={myTheme.errorStyle} inputStyle={myTheme.inputStyleText} underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Date Of Birth" hintText="Select Date Of Birth" container="inline" locale="en-US" firstDayOfWeek={0} autoOk={true} value={this.state.dob} onChange={this.changeDateOfBirth} defaultDate={this.state.dateYesterday}
          >
          </imports.DatePicker>
          <br />
          <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTap}>
                    {this.props.loading ? "Saving..." :'Signup'}
          </imports.RaisedButton>
          
          <div style={{display: 'flex', marginTop:10}}>

            <h5>Already have an account? </h5><Link to="login" style={{marginLeft:10, marginTop:-4, color: myTheme.green}}>Click here</Link>
          </div>

        </section>
        
        <section className="section">
          <div className="feature-link-carousel-cell">
              <a href="https://www.glassdoor.com/blog/do-race-gender-play-a-role-in-salary-negotiations/" data-ga-category="homepage" data-ga-lbl="marketing-whatsnew" data-ga-action="whats-new-click">
                <img width="960" data-original="https://media.glassdoor.com/home/feature-link/reviews/iStock_81884597_MEDIUM.jpg" className="lazy lazy-loaded" src="https://media.glassdoor.com/home/feature-link/reviews/iStock_81884597_MEDIUM.jpg" alt="Do Race &amp; Gender Play a Role in Salary Negotiations? A New Study Says Yes" style={{opacity: 1}}>

                </img>
               </a>
              
            </div>
        </section>
        </div>

        </div>
    );
  }
}

function mapStateToProps(state) {
  let loading = state.getIn(['Register', 'register', 'loading'], false)
  let data = state.getIn(['Register', 'register', 'success'], List())
  let success = '';
  let error = '';
   if(data.size > 0){
      success = data.get("success");
  }
  let errors = state.getIn(['Register', 'register', 'errors'], List())
  // console.log("Error: ", JSON.stringify(errors));
  if(errors.size > 0){
      error = errors.get("error");
  }else{
    error = ''
  }
   console.log("Error: ", error);
  return {
    error,
    success,
    loading
  };
}

const actionsToProps = {
      registerUser: actions.registerUser
    }

export default connect(mapStateToProps, actionsToProps)(Register);
