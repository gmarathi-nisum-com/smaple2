import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../../Users/actions';
import * as loginUtils from '../../Login/utils';


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

export class UserDropdown extends Component {
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
			
	<div>
    <Paper style={style.paper}>
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
    </Paper>
    </div>

			
		)
	}
}

function mapStateToProps(state) {
    const user = loginUtils.getCurrentUser(state)
    let loginId;
    if(user.size > 0){
      loginId = user.get('id');
    }
  return {
    user, loginId
  };
}
export default connect(mapStateToProps, actions)(UserDropdown)
