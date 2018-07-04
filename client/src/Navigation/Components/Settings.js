import React, { Component } from 'react';
import { connect } from 'react-redux';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import {push} from 'react-router-redux';
import * as actions from '../actions';
import {Map, List, fromJS} from 'immutable';
import { Link } from 'react-router';
import moment from 'moment';
import Toggle from 'material-ui/Toggle';
import * as loginUtils from '../../Login/utils';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LoadingBar from 'react-redux-loading-bar';
import * as profileActions from '../../MyProfile/actions';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailChecked: false,
      email: '',
      open: false,
      error: '',
      expanded: true,
      openSuccess: false,
      openError: false,
      phoneChecked: false,
      passwordChecked:false,
      locationChecked: false,
      addressChecked: false,
      accountDeleteChecked: false,
      phone: '',
      newPassword: '',
      currentPassword: '**********',
      addressLineOne: '',
      addressLineTwo: '',
      addressLineThree: '',
      district: '',
      city: '',
      pincode: '',
      reason: null,
      reasonComments: ''

    };
    this.onEmailToggle = this.onEmailToggle.bind(this);
    this.onPhoneToggle = this.onPhoneToggle.bind(this);
    this.onPasswordToggle = this.onPasswordToggle.bind(this);
    this.onLocationToggle = this.onLocationToggle.bind(this);
    this.onAddressToggle = this.onAddressToggle.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePhone = this.changePhone.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeAddressLineOne = this.changeAddressLineOne.bind(this);
    this.changeAddressLineTwo = this.changeAddressLineTwo.bind(this);
    this.changeAddressLineThree = this.changeAddressLineThree.bind(this);
    this.changeDistrict = this.changeDistrict.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changePincode = this.changePincode.bind(this);
    this.onAccountDeleteToggle = this.onAccountDeleteToggle.bind(this);
    //this.changeReason = this.changeReason.bind(this);
  }
static get propTypes() {
    return {
      loginId:React.PropTypes.string,
      loading: React.PropTypes.bool,  
      updateEmail: React.PropTypes.func
    }
  }

componentWillMount(){
    this.props.getProfileImage(this.props.loginId);
    this.props.getCoverPhoto(this.props.loginId);
}
componentWillReceiveProps(nextProps) {
  if(nextProps.success){
    this.state.openSuccess= true
  }
  if(nextProps.error){
    this.state.openError= true
  }
}
handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

changeEmail(evt) {
  this.setState({
      email: evt.target.value
    });
}

changePhone(evt) {
  this.setState({
      phone: evt.target.value
    });
}

changePassword(evt) {
  this.setState({
      newPassword: evt.target.value
    });
}

changeAddressLineOne(evt) {
  this.setState({
      addressLineOne: evt.target.value
    });
}

changeAddressLineTwo(evt) {
  this.setState({
      addressLineTwo: evt.target.value
    });
}

changeAddressLineThree(evt) {
  this.setState({
      addressLineThree: evt.target.value
    });
}

changeDistrict(evt) {
  this.setState({
      district: evt.target.value
    });
}

changeCity(evt) {
  this.setState({
      city: evt.target.value
    });
}

changePincode(evt) {
  this.setState({
      pincode: evt.target.value
    });
}
onEmailToggle = (event, checked) => {
  this.setState({
    emailChecked : checked,
    email: this.props.user.get('email')
  })
}

onPhoneToggle = (event, checked) => {
  this.setState({
    phoneChecked : checked
  })
}

onPasswordToggle = (event, checked) => {
  this.setState({
    passwordChecked : checked
  })
}

onLocationToggle = (event, checked) => {
  this.setState({
    locationChecked : checked
  })
}

onAddressToggle = (event, checked) => {
  this.setState({
    addressChecked : checked
  })
}
onAccountDeleteToggle = (event, checked) => {
  this.setState({
    accountDeleteChecked : checked
  })
}
handleEmail = () => {
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
    }
    else{
      if(this.state.email == this.props.user.get('email')){
        this.setState({
          open: true,
          error : "Please enter new email address and try"
        })
      }else{
        this.setState({
          open: false
        });
              let data = {
                id: this.props.loginId,
                email: this.state.email
              }
              this.props.updateEmail(data);
      }

    }
  };

  handlePhone = () => {

  }

  handlePassword = () => {

  }

  handleRequestClose = () => {
      this.setState({
        open: false,
        openError: false,
        openSuccess: false
      });
    };
  changeReason = (evt) =>{
    console.log("Value: ", evt.target.value)
    this.setState({
        reason: evt.target.value
      });
  } 

  changeReasonComments = (evt) => {
    this.setState({
        reasonComments: evt.target.value
      });
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
    const {user} = this.props; 
    let DateTimeFormat;
    let profilePic = "";
    let coverPhoto = "";
    if(this.props.profileImage && this.props.profileImage.length>0){
      profilePic = `data:image/${this.props.profileImage[0].fileType};base64,`;
      profilePic += new Buffer(this.props.profileImage[0].fileData.data).toString('base64');
    }else{
      profilePic='';
    }
    if(this.props.coverPhoto && this.props.coverPhoto.length>0){
      coverPhoto = `data:image/${this.props.coverPhoto[0].fileType};base64,`;
      coverPhoto += new Buffer(this.props.coverPhoto[0].fileData.data).toString('base64');
    }else{
      coverPhoto='';
    }
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
        />:''}
      <div className="col-xs-12 col-xs-offset-0 col-sm-offset-0 col-md-6 col-md-offset-0 col-lg-7">
       <Card containerStyle={{border: '2px solid #fff'}} style={myTheme.cardStyle}>
        <CardHeader
          title={this.props.userName}
          subtitle="Professional Software Engineer"
          avatar={profilePic}
          style={myTheme.cardHeaderStyle}
                              subtitleColor={myTheme.color}
                              titleColor={myTheme.color}
        />
        <CardMedia
          overlay={<CardTitle title={this.props.userName} subtitle="Your cover photo" />}
        >
          {coverPhoto ? <img src={coverPhoto} width="100%" height="400px"/> :
          <img src="" alt="This user cover photo is not set" width="100%" height="400px"/>}

        </CardMedia>
        <CardTitle title="Settings" subtitle="Update your details below" expandable={true} />
        <CardText>
        <h1>Account</h1>
        <h2>Login & Security</h2>
        <ul className="custom-counter">
          <li><Toggle label="Email Addresses" thumbStyle={{background: 'linear-gradient(to right bottom, #ff2603, #ff2603)'}} onToggle={this.onEmailToggle} labelStyle={myTheme.labelStyle}/>
            {this.props.loading ? this.renderLoading() : ''}
            {this.state.emailChecked ? (
                      <div>          
                      <h4>Update your email address!</h4>
                        <imports.TextField inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Email"hintText="Enter your email" value={this.state.email} onChange={this.changeEmail} name="email" type="text" />
                      <br />
                      <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleEmail}>
                        Update
                      </imports.RaisedButton>                 
                  </div>

            ) : ''}
            <hr />
            </li>
        <li>
        <Toggle label="Phone numbers" thumbStyle={{background: 'linear-gradient(to right bottom, #ff2603, #f13a59)'}} onToggle={this.onPhoneToggle} labelStyle={myTheme.labelStyle}/>
        {this.state.phoneChecked ? (
                    <div>          
                    <h4>Update your Phone number here!</h4>
                      <imports.TextField inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Phone Number" hintText="Enter your Phone" value={this.state.phone} onChange={this.changePhone} name="phone" type="text" />
                    <br />
                    <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handlePhone}>
                      Update
                    </imports.RaisedButton>                 
                </div>

          ) : ''}
        <hr />
      </li>
      <li>
        <Toggle label="Change Password" thumbStyle={{background: 'linear-gradient(to right bottom, #ff2603, #f13a59)'}} onToggle={this.onPasswordToggle} labelStyle={myTheme.labelStyle}/>
          {this.state.passwordChecked ? (
                      <div>          
                      <h4>Change your Password here!</h4>
                        <imports.TextField inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Current Password" value={this.state.currentPassword} name="cPassword" type="text" disabled={true}/>
                      <br />
                      <imports.TextField inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="New password" hintText="Enter your new password" value={this.state.newPassword} onChange={this.changePassword} name="newPassword" type="text" />
                      <br />
                      <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handlePhone}>
                        Save
                      </imports.RaisedButton>                 
                  </div>

            ) : ''}
        <hr />
      </li>
      <li>
        <Toggle label="Change Address" thumbStyle={{background: 'linear-gradient(to right bottom, #ff2603,#f13a59)'}} onToggle={this.onAddressToggle} labelStyle={myTheme.labelStyle}/>
          {this.state.addressChecked ? (
                    <div>          
                    <h4>Change your address below!</h4>
                    <div className="row" style={{marginLeft: 10, display: 'flex'}}>
                      <div style={{marginRight: 30}}>
                        <imports.TextField inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Address Line One" hintText="Enter your address" value={this.state.addressLineOne} onChange={this.changeAddressLineOne} name="addresslineOne" type="text" />
                      </div>
                      <div>
                        <imports.TextField inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Address Line two" hintText="Enter your address" value={this.state.addressLineTwo} onChange={this.changeAddressLineTwo} name="addresslineTwo" type="text" />
                      </div>
                    </div>
                    <div className="row" style={{marginLeft: 10, display: 'flex'}}>
                      <div style={{marginRight: 30}}>
                        <imports.TextField inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Address Line three" hintText="Enter your address" value={this.state.addressLineThree} onChange={this.changeAddressLineThree} name="addresslineThree" type="text" />
                      </div>
                      <div> 
                        <imports.TextField inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="District" hintText="Enter your District" value={this.state.district} onChange={this.changeDistrict} name="district" type="text" />
                      </div>
                    </div>
                    <div className="row" style={{marginLeft: 10, display: 'flex'}}>
                      <div style={{marginRight: 30}}>
                        <imports.TextField inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="City" hintText="Enter your city" value={this.state.city} onChange={this.changeCity} name="city" type="text" />
                      </div>
                      <div>
                        <imports.TextField inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Pincode" hintText="Enter your pincode" value={this.state.pincode} onChange={this.changePincode} name="pincode" type="text" />
                      </div>
                    </div>
                    <br />
                    <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handlePhone}>
                      Change
                    </imports.RaisedButton>                 
                </div>

          ) : ''}
        <hr />
      </li>
  </ul>

  <h2>Account Delete</h2>
      <ul className="custom-counter">
        <li><Toggle label="Account delete" thumbStyle={{background: 'linear-gradient(to right bottom, #ff2603, #f13a59)'}} onToggle={this.onAccountDeleteToggle} labelStyle={myTheme.labelStyle}/>

          {this.state.accountDeleteChecked ? (
                <div>          
                  <h4>{this.props.userName}, we’re sorry to see you go </h4>
                  <p>Are you sure you want to close your account? You’ll lose your friends, colleagues, family members and valuable posts.</p>   
                  <hr />
                  <h4>Tell us why you’re closing your account:</h4>
                  <imports.RadioButtonGroup name="reason" valueSelected={this.state.reason} style={{ marginTop: 20}} onChange={this.changeReason}>
                      <imports.RadioButton
                          value='I have a duplicate account'
                          name="I have a duplicate account"
                          label='I have a duplicate account'
                          style={{ width: '100%'}}
                          labelStyle={myTheme.labelStyle}
                          inputStyle={myTheme.inputStyle}
                          iconStyle={myTheme.iconStyle}
                        />

                      <imports.RadioButton
                          value='I’m getting too many emails'
                          label="I’m getting too many emails"
                          name="I’m getting too many emails"
                          style={{ width: '100%'}}
                          labelStyle={myTheme.labelStyle}
                          inputStyle={myTheme.inputStyle}
                          iconStyle={myTheme.iconStyle}
                        />

                        <imports.RadioButton
                          value='I’m not getting any value from this account'
                          label="I’m not getting any value from this account"
                          name="I’m not getting any value from this account"
                          style={{width: '100%'}}
                          labelStyle={myTheme.labelStyle}
                          inputStyle={myTheme.inputStyle}
                          iconStyle={myTheme.iconStyle}
                        />

                        <imports.RadioButton
                          value='I have a privacy concern'
                          label="I have a privacy concern"
                          name="I have a privacy concern"
                          style={{ width: '100%'}}
                          labelStyle={myTheme.labelStyle}
                          inputStyle={myTheme.inputStyle}
                          iconStyle={myTheme.iconStyle}
                        />

                        <imports.RadioButton
                          value='I’m receiving unwanted contact'
                          label="I’m receiving unwanted contact"
                          name='I’m receiving unwanted contact'
                          style={{ width: '100%'}}
                          labelStyle={myTheme.labelStyle}
                          inputStyle={myTheme.inputStyle}
                          iconStyle={myTheme.iconStyle}
                        />

                        <imports.RadioButton
                          value='other'
                          label="Other"
                          name='other'
                          style={{ width: '100%'}}
                          labelStyle={myTheme.labelStyle}
                          inputStyle={myTheme.inputStyle}
                          iconStyle={myTheme.iconStyle}
                        />
                </imports.RadioButtonGroup>  
                <p>Your feedback matters. Is there anything else you’d like us to know?</p> 
                    <imports.TextField fullWidth={true} multiLine={true} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Comments" hintText="Enter your comments" value={this.state.reasonComments} onChange={this.changeReasonComments} name="comments" type="text" />
                </div>
            ) : ''}
          </li>
        </ul>
        </CardText>
      </Card>
      <br/>
      <br/>
</div>
        </div>
    );
  }
}

function mapStateToProps(state) {
    const user = loginUtils.getCurrentUser(state);
        let loginId;
    let userName = `${user.get("firstName")} ${user.get("lastName")}`
    userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    if(user.size > 0){
      loginId = user.get('id');
    }
    let loading = state.getIn(['Settings', 'update', 'email', 'loading'], false);
    let error = state.getIn(['Settings', 'update', 'email', 'error']);
    let success = state.getIn(['Settings', 'update', 'email', 'success']);
    let profileLoading = state.getIn(['MyProfile', 'profileImage', 'loading'], false);
    let profileImage = state.getIn(['MyProfile', 'profileImage', 'success'], List());
    profileImage = profileImage.toJS();
    let profileImageError = state.getIn(['MyProfile', 'profileImage', 'errors'], '');

    let coverPhotoLoading = state.getIn(['MyProfile', 'getCoverPhoto', 'loading'], false);
    let coverPhoto = state.getIn(['MyProfile', 'getCoverPhoto', 'success'], List());
    coverPhoto = coverPhoto.toJS();
    let coverPhotoError = state.getIn(['MyProfile', 'getCoverPhoto', 'errors'], '');
  return {
    user,
    loginId,
    userName,
    loading,
    success,
    error,
    coverPhotoLoading, coverPhoto, coverPhotoError,
    profileLoading, profileImage, profileImageError
  };
}

const actionsToProps = {
      updateEmail: actions.updateEmail,
      getProfileImage: profileActions.getProfileImage,
      getCoverPhoto: profileActions.getCoverPhoto,
      push
    }

export default connect(mapStateToProps, actionsToProps)(Settings);
