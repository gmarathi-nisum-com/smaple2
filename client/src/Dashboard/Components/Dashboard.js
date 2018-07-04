import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import Comment from 'material-ui/svg-icons/communication/comment';
import Like from 'material-ui/svg-icons/action/thumb-up';
import Social from 'material-ui/svg-icons/social/share';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import * as loginUtils from '../../Login/utils';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import Message from 'material-ui/svg-icons/communication/message';
import Favourites from './Favourites';
import UsersPost from './UsersPost';
import ComposePost from './ComposePost';

class CardComponent extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    const containerStyle = {
      width: "50%",
      height: "50%"
    }
    const titleStyle ={
      width: "30%",
      height: "50%"
    }
    return (
<div>
<Card id="card" style={{backgroundColor: 'transparent', marginBottom: 5}}>
              <div className="row">
                <div className="col-md-8">
                <CardHeader
                  title="Victory Venkatesh"
                  subtitle="Awesome Actor"
                  avatar="../../../public/images/venkatesh.jpg"
                  titleStyle={myTheme.cardTitle}
                  subtitleStyle={myTheme.cardText}
                />
              </div>
              <div className="col-lg-4">
                <IconMenu
                  iconButtonElement={<IconButton><ContentFilter /></IconButton>}
                  iconStyle={{color: '#ffffff'}}
                  listStyle={{backgroundColor: 'transparent'}}
                  menuStyle={{color: '#ffffff', backgroundColor: 'transparent'}}
                  style={{float:'right'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  animated={true}
                  id='icon'
                >
                  <MenuItem style={{color:"#ffffff", width:"200px"}} value="1" primaryText="Edit" />
                  <MenuItem style={{color:"#ffffff", width:"200px"}} value="2" primaryText="Delete" />
                </IconMenu> 
                </div> 
              </div>         
              <CardText style={myTheme.cardText}>
                <h4 style={{marginTop: "0px"}}>Positive:</h4>
                  <p className="mb-3">This is a sample text about positive.</p>
                <h4 style={{marginTop: "0px"}}>Negative:</h4>
                  <p className="mb-3">This is a sample text about Negative.</p>
                <h4 style={{marginTop: "0px"}}>Advice:</h4>
                  <p className="mb-3">This is a sample text about Advice.</p>
              </CardText>
              <CardActions>
              <div className="row"> 
                <div className="col-sm-4" style={{color:"#ffffff"}}>
                  <Link style={{color:"#ffffff"}}><Like style={{marginRight: '10px', marginLeft:'60px',marginBottom:'-5px',color:"#ffffff"}}/>Likes</Link> 
                </div>
                <div className="col-sm-4" style={{color:"#ffffff"}}>
                    <Link style={{color:"#ffffff"}}> <Comment style={{marginRight: '10px', marginLeft:'60px', marginBottom:'-5px', color:"#ffffff"}}/>Comments</Link> 
                </div>
                <div className="col-sm-4" style={{color:"#ffffff"}}>
                  <Link style={{color:"#ffffff"}}><Social style={{marginRight: '10px', marginLeft:'60px', marginBottom:'-5px', color:"#ffffff"}}/>Share</Link> 
                </div>
              </div>
              </CardActions>
            </Card>
</div>
      )
  }
}

function mapStateToprops(state) {
  return {  };
}

const mappedCardComponent = connect(mapStateToprops, { })(CardComponent);
class Dashboard extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    const containerStyle = {
      width: "50%",
      height: "50%"
    }
    const titleStyle ={
      width: "30%",
      height: "50%"
    }
    return (
        <div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <ComposePost userName={this.props.userName} loginId={this.props.loginId}/>
                    <br />
                </div>
              </div>
                <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <UsersPost userName={this.props.userName} searchedUserId={this.props.loginId}/>
                    <br />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <UsersPost userName={this.props.userName} searchedUserId={this.props.loginId}/>
                    <br />
                  </div>
                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <UsersPost userName={this.props.userName} searchedUserId={this.props.loginId}/>
                    <br />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <UsersPost userName={this.props.userName} searchedUserId={this.props.loginId}/>
                    <br />
                  </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4">
              <Favourites userName={this.props.userName} searchedUserId={this.props.loginId}/>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2"></div>
        </div>
        </div>
    );
  }
}

function mapStateToprops(state) {
      const user = loginUtils.getCurrentUser(state)
    let userName = `${user.get("firstName")} ${user.get("lastName")}`;
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    let dob = user.get('dob');
    let loginId = user.get('id')
  return {userName, dob, loginId};
}

export default connect(mapStateToprops, { })(Dashboard);
