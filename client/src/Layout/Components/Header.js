import React, { Component } from 'react';
import { connect} from 'react-redux';
import {push} from 'react-router-redux';
import { Link } from 'react-router';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import PostComponent from '../../Post/Components/Post';
import Modal from '../../Layout/Components/Modal';
import Search from '../../Search/Components/Search';
import * as loginUtils from '../../Login/utils';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Logo1 from 'material-ui/svg-icons/image/blur-on';
import Logo2 from 'material-ui/svg-icons/action/supervisor-account';
import Logo4 from 'material-ui/svg-icons/social/pages';
import Logo from 'material-ui/svg-icons/action/verified-user';
import Logo3 from 'material-ui/svg-icons/social/whatshot';
import Home from 'material-ui/svg-icons/action/home';
import Settings from 'material-ui/svg-icons/action/settings';

import AddCircle from 'material-ui/svg-icons/content/add-circle';
import Logout from 'material-ui/svg-icons/action/power-settings-new';
import Calender from 'material-ui/svg-icons/action/perm-contact-calendar';
import Notifications from 'material-ui/svg-icons/social/notifications';
import Avatar from 'react-avatar';
// import AccountCircle from 'material-ui/svg-icons/Action/acount-circle';

import AccountCircle from 'material-ui/svg-icons/action/account-circle';
// import UserDropdown from '../../Layout/Components/UserDropdown';
import * as actions from '../../Users/actions';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import NotificationsComponent from './Notifications'
import socket from '../../../socket';
// console.log("Socket.....", socket)
const socketClient = socket;

class UserDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  static get propTypes() {
    return {
      user: React.PropTypes.object.isRequired,
      logout: React.PropTypes.func
    }
  }

  static get contextTypes()  {
    return {
      router: function() { return React.PropTypes.func.isRequired; }
    }
  }

  render() {
    const {user, loginId} = this.props;
    const style = {
      paper: {
        display: 'inline-block',
        float: 'left',
        margin: '16px 32px 16px 0',
      },
      rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
      },
    };
    const logout = function () {
      this.props.logout()
      this.context.router.push('/login')
    }.bind(this)

    return (    
      <div className="dropdown-content">
          <Menu>
            <MenuItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
            <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
            <MenuItem primaryText="Get links" leftIcon={<ContentLink />} />
            <Divider />
            <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
            <MenuItem primaryText="Download" leftIcon={<Download />} />
            <Divider />
            <MenuItem primaryText="Remove" onItemClick={logout} leftIcon={<Delete />} />
          </Menu>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu-media show" role="menu">
              <div className="dropdown-menu-header" role="presentation">
                <h5>MESSAGES</h5>
                <span className="badge badge-round badge-info">New 3</span>
              </div>

              <div className="list-group scrollable is-enabled scrollable-vertical" role="presentation" style="position: relative;">
                <div data-role="container" className="scrollable-container" style="height: 270px; width: 375px;">
                  <div data-role="content" className="scrollable-content" style="width: 358px;">
                    <a className="list-group-item" href="" role="menuitem">
                      <div className="media">
                        <div className="pr-10">
                          <span className="avatar avatar-sm avatar-online">
                            <img src="../../public/images/venkatesh.jpg" alt="..." />
                            <i></i>
                          </span>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">Mary Adams</h6>
                          <div className="media-meta">
                            <time datetime="2018-06-17T20:22:05+08:00">30 minutes ago</time>
                          </div>
                          <div className="media-detail">Anyways, i would like just do it</div>
                        </div>
                      </div>
                    </a>
                    <a className="list-group-item" href="" role="menuitem">
                      <div className="media">
                        <div className="pr-10">
                          <span className="avatar avatar-sm avatar-off">
                            <img src="../../public/images/venkatesh.jpg" alt="..." />
                            <i></i>
                          </span>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">Caleb Richards</h6>
                          <div className="media-meta">
                            <time datetime="2018-06-17T12:30:30+08:00">12 hours ago</time>
                          </div>
                          <div className="media-detail">I checheck the document. But there seems</div>
                        </div>
                      </div>
                    </a>
                    <a className="list-group-item" href="" role="menuitem">
                      <div className="media">
                        <div className="pr-10">
                          <span className="avatar avatar-sm avatar-busy">
                            <img src="../../public/images/venkatesh.jpg" alt="..." />
                            <i></i>
                          </span>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">June Lane</h6>
                          <div className="media-meta">
                            <time datetime="2018-06-16T18:38:40+08:00">2 days ago</time>
                          </div>
                          <div className="media-detail">Lorem ipsum Id consectetur et minim</div>
                        </div>
                      </div>
                    </a>
                    <a className="list-group-item" href="" role="menuitem">
                      <div className="media">
                        <div className="pr-10">
                          <span className="avatar avatar-sm avatar-away">
                            <img src="../../public/images/venkatesh.jpg" alt="..." />
                            <i></i>
                          </span>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">Edward Fletcher</h6>
                          <div className="media-meta">
                            <time datetime="2018-06-15T20:34:48+08:00">3 days ago</time>
                          </div>
                          <div className="media-detail">Dolor et irure cupidatat commodo nostrud nostrud.</div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              <div className="scrollable-bar scrollable-bar-vertical scrollable-bar-hide" draggable="false"><div className="scrollable-bar-handle" style="height: 191.189px;"></div></div></div>
              <div className="dropdown-menu-footer" role="presentation">
                <a className="dropdown-menu-footer-btn" href="" role="button">
                    <i className="icon wb-settings" aria-hidden="true"></i>
                  </a>
                <a className="dropdown-item" href="" role="menuitem">
                    See all messages
                  </a>
              </div>
            </div>
      </div>   
    )
  }
}

function mapStateToPropsMenu(state) {
    const user = loginUtils.getCurrentUser(state)
    let loginId;
    if(user.size > 0){
      loginId = user.get('id');
    }
  return {
    user, loginId
  };
}
const MappedUserDropdown = connect(mapStateToPropsMenu, actions)(UserDropdown)


class HeaderTemplate extends Component {
   constructor(props) {
    super(props);
    this.state = {
      userMenu: false,
      menuValue: "",
      dropDown: false,
      showPostModal: false,
      widthSize:910,
      notifications: [],
      friendId: '',
      userId: this.props.loginId
    };

  this.userMenu = this.userMenu.bind(this);
  this.handleChangeMenu = this.handleChangeMenu.bind(this);
  // this.renderUserDropDown = this.renderUserDropDown.bind(this)
  this.logout = this.logout.bind(this)
  this.setValue = this.setValue.bind(this)
  }
  componentWillMount(){
    if(window.location.href.indexOf("profile") > -1) {
      let url = window.location.href;
      let params = url.split('/');
      let friendId = params[3];
      this.setState({
        friendId: params[3]
      })
    }
  }
  componentDidMount(){
     socketClient.on('new friend', (data) => {
        if(this.props.loginId==data.friendId){
          this.setState({
            notifications: data
          })
        }
        
      // fetchConversation(params.conversationId);
    });
   if(this.state.friendId != ''){
      this.setState({
        userId: this.state.friendId
      })
    }
  }
  static get contextTypes()  {
      return {
        router: React.PropTypes.object
      }
    }
    
  addPost = () => {
    this.setState({
      showPostModal: true
    })
  }
  userMenu(){
    console.log("Clicked")
    this.setState({userMenu: true});
  }
  handleChangeMenu(e){
    console.log("Clicked")
    this.setState({menuValue: e});
  }

  logout() {
      this.props.logout()
      this.context.router.push('/login')
    }
setValue(){
  this.setState({
    dropDown: true
  })
}
handleEmailModelHide = () => {
  this.setState({
    showPostModal: false
  })
}
 showPostModal = () => {
        return(
            <Modal title='Add Post' handleHideModal={this.handleEmailModelHide} modelBodySize={{maxHeight:((window.innerHeight-100)+'px'),paddingTop:'0',paddingRight:'0',paddingLeft:'0',borderBottom:'1px solid black'}}>
                <PostComponent userId={this.state.userId} />
            </Modal>
        )
    }
  render() {
    const {user, loginId} = this.props;
    const style = {
      paper: {
        display: 'inline-block',
        float: 'right',
        margin: '16px 32px 16px 0',
      },
      rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
      },
    };
    const postPath = `${this.props.loginId}/post`;
    const resumeView = `${this.props.loginId}/resumeView`;
    const settingsPath = `${this.props.loginId}/settings`;
    const profilePath = `${this.props.loginId}/myProfile`;
    const logout = function () {
      this.props.logout()
      this.context.router.push('/login')
    }.bind(this)
   let homePath = null;
   if(this.props.authenticated){
      homePath = `/dashboard`;
   }else{
      homePath = `/home`;
   }
    return (
      <div> 
      {this.state.showPostModal ? this.showPostModal() : null}
<nav className="navbar navbar-inverse navbar-fixed-top navbar-semi-transparent navbar-highlight-green">
<div className="container-fluid">
  <div className="navbar-header">
    <Link style={{display:'flex', marginTop: 30}} className="navbar-brand" to={homePath}>

                      
    <span style={{fontFamily: 'Copperplate Gothic Bold', marginLeft: 20, fontSize: 28, fontWeight: 550}}>NETEXT</span></Link>     
    <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
      <span className="navbar-toggler-icon"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
    </button>
  </div>
  
  <div id="navbarCollapse" className="collapse navbar-collapse">
     {!this.props.authenticated ? (<ul className="nav navbar-nav">
     
    </ul>):
(<ul className="nav navbar-nav navbar-left">
      <li key={10} className="nav-item">
        <Search />
      </li>
      </ul>)
  }
    
      
    {this.props.authenticated ? (<ul className="nav navbar-nav navbar-right">
      
<li className="nav-item">
          <Link to="/create-page" title="Create Add page" target="_blank" className="red-tooltip" data-toggle="tooltip" data-placement="bottom">
                <imports.Add style={{marginBottom:'-5px', color:'#fff'}} />
          </Link>
          </li>
      <li key={11} className="nav-item  dropdown">
        <a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle user-action">
          <imports.IconButton style={{marginTop:-10}} iconStyle={{color: '#fff'}} tooltip="Notifications">
            <Notifications style={{marginBottom:'-5px'}}/>
          <span className="badge">10</span>
        </imports.IconButton>
      </a>
      {this.state.notifications ? <NotificationsComponent notificationsData={this.state.notifications}/> : ''}
      </li>

        <li key={18} className="nav-item">
        <imports.IconButton style={{marginTop:3}} iconStyle={{color: '#fff'}} tooltip="Add Post">
                <imports.AddCircle onClick={this.addPost} />
        </imports.IconButton>
      </li>
      <li key={19} className="nav-item dropdown">
        <a href="#" data-toggle="dropdown">
          <imports.IconButton style={{marginTop:-12}} iconStyle={{color: '#fff'}} tooltip="Profile">
            <AccountCircle />
          </imports.IconButton>
        </a>

        <ul className="dropdown-menu">
          <li key={20}><Link to={profilePath} target="_blank"><Avatar color="#ff2603" fgColor='#fff' style={{fontWeight: 'bold', marginTop:'-3px', marginBottom: -6, marginRight: 15, marginLeft: -8}} name={this.props.userName} round={true} size={35} /> {this.props.userName}</Link></li>
          <li key={21} className="divider dropdown-divider"></li>
          <li key={22}><a href="#" className="dropdown-item"><Calender color="#ff2603" style={{marginTop:'-3px', marginRight: 15}} /> Calendar</a></li>
          <li key={23} className="divider dropdown-divider"></li>
          <li key={24}><Link to={settingsPath} target="_blank"><Settings color="#ff2603" style={{marginTop:'-3px', marginRight: 15}} /> Account Settings</Link></li>
          <li key={25} className="divider dropdown-divider"></li>
          <li key={26}><a href="#" onClick={this.logout}><Logout color="#ff2603" style={{marginTop:'-3px', marginRight: 15}} />Logout</a></li>
        </ul>
      </li>
    </ul>):
        
        (
        <ul className="nav navbar-nav navbar-right">
          <li key={26}>
            <Link to="login" className="red-tooltip" data-toggle="tooltip" data-placement="bottom" title="Signin">Login</Link>
          </li>
          <li key={27}>
            <Link to="register" className="red-tooltip" data-toggle="tooltip" data-placement="bottom" title="Signup">Sign Up</Link>
          </li>
        </ul>)
  }
    </div>
        </div>
  </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    console.log("State: ", state)
    const user = loginUtils.getCurrentUser(state)
    let loginId;
    let userName = `${user.get("firstName")} ${user.get("lastName")}`
       userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    // console.log("User: ", JSON.stringify(user, undefined, 2))
    if(user.size > 0){
      loginId = user.get('id');
    }
  return {
    user, loginId, authenticated: state.getIn(['Login', 'user', 'authenticate'], false),
    loggedout: state.getIn(['Logout', 'user', 'authenticate'], false), userName
  };
}

export default connect(mapStateToProps, actions)(HeaderTemplate);


