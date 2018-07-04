import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {Map, List, fromJS} from 'immutable';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import {push} from 'react-router-redux';
import { Link } from 'react-router';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: '',
      email: '',
      openError: false,
      openSuccess: false
    };
    this.changeEmail = this.changeEmail.bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,  
        getForgotPasswordToken: React.PropTypes.func
      }
    }
componentWillReceiveProps(nextProps) {
     // console.log("nextProps.message.length: ", JSON.stringify(nextProps))
  if(nextProps.success.length > 0){
    this.state.openSuccess= true
  }

  if(nextProps.error.length > 0){
    this.state.openError= true
  }

  if(nextProps.redirectToSignupPage){
    // setTimeout(function(){
    //   this.context.router.push('/register');
    // }, 3000);

    setTimeout(() => {
      this.context.router.push('/register')
    }, 4000); 
    
  }
}

  // componentWillMount() {
  //   if (this.props.authenticated) {
  //     this.context.router.push('/login');
  //   }
  // }

  // componentWillUpdate(nextProps) {
  //   if (nextProps.authenticated) {
  //     this.context.router.push('/login');
  //   }
  // }
handleTouchTap = () => {
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
      // var data = {};
      // data.email = this.state.email;
     this.props.getForgotPasswordToken(this.state.email);
     // setTimeout(function(){
     //     window.location.href = `${CLIENT_ROOT_URL}/login`;
     //  }, 2000);
    }
  };

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
        const {error, success, loading} = this.props; 
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
            {this.props.error ? <imports.Snackbar
              open={this.state.openError}
              message={this.props.error}
              autoHideDuration={4000}
              bodyStyle={myTheme.bodyStyle}
              action="Close"
              onRequestClose={this.handleRequestClose}
              onActionTouchTap={this.handleRequestClose}
              style={myTheme.snackbarfromTop}
            /> : ''}
          <div className="module row" style={{display: 'flex'}}>
            <section className="section">
                 <h2>Forgot Password</h2>        
                       
              <h3>Enter your email below and we will send you a link to  reset your password</h3>
              <imports.TextField underlineStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Email" hintText="Enter your email" value={this.state.email} onChange={this.changeEmail} name="email" /> 
              <br/>
          
            <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTap}>
              {this.props.loading ? "Sending Email":"Submit"}
            </imports.RaisedButton>
              <p>Goto Login <Link to="login" style={{marginLeft:'10px', marginTop: '5px', color: myTheme.green}}><u>Click here</u></Link></p>
            </section>
            <section className="section">
          <div className="feature-link-carousel-cell">
              <a href="https://www.glassdoor.com/blog/do-race-gender-play-a-role-in-salary-negotiations/" data-ga-category="homepage" data-ga-lbl="marketing-whatsnew" data-ga-action="whats-new-click">
                <img width="320" data-original="https://media.glassdoor.com/home/feature-link/reviews/iStock_81884597_MEDIUM.jpg" className="lazy lazy-loaded" src="http://mainsteem.com/wp-content/uploads/2017/11/forgot_Password.png" alt="Do Race &amp; Gender Play a Role in Salary Negotiations? A New Study Says Yes" style={{opacity: 1}}>

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
  let loading = state.getIn(['ForgotPassword', 'password', 'loading'], false)
  let success = state.getIn(['ForgotPassword', 'password', 'message'], List())
  let errors = state.getIn(['ForgotPassword', 'password', 'errors'], List())
  let redirectToSignupPage = false;
  let error = ''
    console.log("Errors: ", JSON.stringify(errors.size))
  if(errors.size > 0){
      console.log("error status: ", errors.get('status'))
      error = errors.get('error');
      if(errors.get('status') == 422){
        redirectToSignupPage = true;
      }
  }else{
    error = ''
  }
  // console.log("redirectToSignupPage: ", redirectToSignupPage)
  return {
    error,
    success,
    loading,
    redirectToSignupPage
  };
}
const actionsToProps = {
      getForgotPasswordToken: actions.getForgotPasswordToken,
      push
    }
export default connect(mapStateToProps, actionsToProps)(ForgotPassword);
