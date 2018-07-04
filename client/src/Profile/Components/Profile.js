import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as usersActions from '../../Users/actions';
import * as profileActions from '../../MyProfile/actions';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as loginUtils from '../../Login/utils';
import {router, push} from 'react-router-redux';
import {Map, List, fromJS, toJS} from 'immutable';
import Favourites from '../../Dashboard/Components/Favourites';
import AboutYou from '../../Dashboard/Components/AboutYou';
import AskPreferences from '../../Dashboard/Components/AskPreferences';
import UsersPost from '../../Dashboard/Components/UsersPost';
import Avatar from 'react-avatar';
import socket from '../../../socket';
// console.log("Socket.....", socket)
const socketClient = socket;

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchedUserId: ''
    }
  }
  static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,  
        submitFriendRequest: React.PropTypes.func,
        fetchUser: React.PropTypes.func
      }
    }
    componentDidMount(){

    }
  componentWillMount(){
    // console.log("Check id111")
    let url = window.location.href;
    let params = url.split('/');
    let friendId = params[3];
    // console.log("Check id111")
    this.props.fetchUser(friendId);
    this.props.getProfileImage(friendId);
    this.props.getCoverPhoto(friendId);
    // console.log("Check id", friendId)
    
    this.setState({
      searchedUserId: friendId
    })

     // console.log("New friend.... ")
     // socketClient.on('new friend', (data) => {
     //  console.log("New friend: ", data)
      // fetchConversation(params.conversationId);
    // });
  }

  componentWillRecieveProps(newProps){
       
  }
  AddFriend = (loginId) => {
    let url = window.location.href;
    let params = url.split('/');
    let friendId = params[3];
    let data = {}
    data.loginId = loginId;
    data.friendId = friendId;
    this.props.submitFriendRequest(data)
    socketClient.emit('new friend request', data);
  }
  render() {
    const {userName, dob, loginId, friendRequestloading, friendRequestSuccess, friendRequestError, userDeatilsLoading, userDetails, userDeatilsError} = this.props;
    if(userDetails){
      if(userDetails.size>0){
        var fullName = userDetails.get('firstName') +" "+ userDetails.get('lastName');
      }
    }
    let profilePic = "";
    let coverPhoto = "";
    if(this.props.profileImage && this.props.profileImage.length>0){
      profilePic = `data:image/${this.props.profileImage[0].fileType};base64,`;
      profilePic += new Buffer(this.props.profileImage[0].fileData.data).toString('base64');
    }else{
      profilePic='';
    }
console.log("coverPhoto", this.props.coverPhoto)
    if(this.props.coverPhoto && this.props.coverPhoto.length>0){

      coverPhoto = `data:image/${this.props.coverPhoto[0].fileType};base64,`;
      coverPhoto += new Buffer(this.props.coverPhoto[0].fileData.data).toString('base64');
    }else{
      coverPhoto='';
    }
     
    return (
      <div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">   
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="profile clearfix">                            
                      <div className="slider">
                        <div id="carousel-example-generic" className="carousel slide" data-ride="carousel" data-interval="500">
                          <div className="carousel-inner" role="listbox">
                            <div className="item active">

                            {coverPhoto ? <img src={coverPhoto} width="100%" height="400px"/> :
                              <img src="" alt="This user cover photo is not set" width="100%" height="400px"/>}
                            </div>
                            
                            <div className="col-sm-12 add-user text-right">
                              <imports.IconButton tooltip="Add Friend" style={{}} iconStyle={{marginTop:15, color:"#fff"}}><imports.PersonAdd onClick={() => this.AddFriend(this.props.loginId)}/></imports.IconButton>
                              </div>
                          </div>
                          <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                            
                          </a>
                          <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                            
                          </a>
                          </div>
                          </div>                             
                      <div className="user clearfix">
                          <div className="avatar">
                              {profilePic ? <Avatar className="img-thumbnail img-profile" src={profilePic} color='#ffbc03' fgColor='#fff' style={{borderRadius: 'none', width: 'none', height: 'none', fontWeight: 'bold'}} size={110} /> : 
                              <Avatar className="img-thumbnail img-profile" color='#ffbc03' fgColor='#fff' style={{borderRadius: 'none', width: 'none', height: 'none', fontWeight: 'bold'}} name={fullName} size={110} />
                              }
                          </div>                                
                                                         
                          <div className="actions">
                              <div className="cover-text">
                                <h1 className="cover-h1-text">
                                  <span className="cover-span-text">
                                  {fullName && <label style={{fontWeight: 'normal', marginLeft:26, color: "#fff"}}>{fullName}</label>}
                                  
                                  </span>
                                </h1>
                             </div>
                          </div>                                                                                                
                      </div>
                      </div>                          
                  </div>
             </div>
             <div className="row">
                <div style={{marginLeft:-15, width: '105%'}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <UsersPost userName={fullName} searchedUserId={this.state.searchedUserId}/>
                  <br />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <UsersPost userName={fullName} searchedUserId={this.state.searchedUserId}/>
                  <br />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <UsersPost userName={fullName} searchedUserId={this.state.searchedUserId}/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <UsersPost userName={fullName} searchedUserId={this.state.searchedUserId}/>
                </div>
             </div>
              </div>
              </div>
              <div className="col-sm-4">
                <Favourites userName={fullName} searchedUserId={this.state.searchedUserId}/>
                <br />
                <AboutYou userName={fullName} searchedUserId={this.state.searchedUserId}/>
                <br />
                <AskPreferences userName={fullName} searchedUserId={this.state.searchedUserId}/>
              </div>
              <div className="col-sm-2">
                
              </div>
            </div>
             

          </div>
    );
  }
}

function mapStateToProps(state) {
      const user = loginUtils.getCurrentUser(state)
    let userName = `${user.get("firstName")} ${user.get("lastName")}`
    let dob = user.get('dob');
    let loginId;
    if(user.size > 0){
      loginId = user.get('id');
    }
    let friendRequestloading = state.getIn(['Profile', 'friendRequest', 'loading'], false)
    let friendRequestSuccess = state.getIn(['Profile', 'friendRequest', 'success'], List())
    let friendRequestError = state.getIn(['Profile', 'friendRequest', 'error'], List())
     let userDeatilsLoading = state.getIn(['User', 'userDetails', 'loading'], false)
    let userDetails = state.getIn(['User', 'userDetails', 'success'], List())
    let userDeatilsError = state.getIn(['User', 'userDetails', 'error'], List())
    let profileLoading = state.getIn(['MyProfile', 'profileImage', 'loading'], false);
    let profileImage = state.getIn(['MyProfile', 'profileImage', 'success'], List());
    profileImage = profileImage.toJS();
    let profileImageError = state.getIn(['MyProfile', 'profileImage', 'errors'], '');

    let coverPhotoLoading = state.getIn(['MyProfile', 'getCoverPhoto', 'loading'], false);
    let coverPhoto = state.getIn(['MyProfile', 'getCoverPhoto', 'success'], List());
    coverPhoto = coverPhoto.toJS();
    let coverPhotoError = state.getIn(['MyProfile', 'getCoverPhoto', 'errors'], '');
  return {coverPhotoLoading, coverPhoto, coverPhotoError, userName, profileLoading, profileImage, profileImageError, dob, loginId, friendRequestloading, friendRequestSuccess, friendRequestError, userDeatilsLoading, userDetails, userDeatilsError};
}
const actionsToProps = {
      submitFriendRequest: actions.submitFriendRequest,
      fetchUser: usersActions.fetchUser,
      getProfileImage: profileActions.getProfileImage,
      getCoverPhoto: profileActions.getCoverPhoto,
      push
    }
export default connect(mapStateToProps, actionsToProps)(Profile);
