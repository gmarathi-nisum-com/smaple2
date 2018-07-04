import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../../Users/actions';
import * as loginUtils from '../../Login/utils';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import imports from '../../common/imports';

export class Notifications extends Component {
  static get propTypes() {
    return {
      user: React.PropTypes.object.isRequired,
      logout: React.PropTypes.func
    }
  }

	render() {
    const {notificationsData} = this.props;
    // console.log("notificationsData:", notificationsData.requester);
    let rows = [];
    if(notificationsData.length>0){
      let text = `${notificationsData.loginId} sent you friend request`;
      rows.push(<ListItem
          primaryText={text}
          leftAvatar={<imports.PersonAdd />}
          rightIcon={<imports.PersonAdd />}
        />)
    }
	return (
  	 <ul className="dropdown-menu">
        <List>
          <Subheader>Friend Request</Subheader>
            {rows.length > 0 ? (<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">{rows}</div>) : 'No notifications'}
            {rows}
        </List>
      </ul>
		)
	}
}

function mapStateToProps(state) {

  return {

  };
}
export default connect(mapStateToProps, actions)(Notifications)
