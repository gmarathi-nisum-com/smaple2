import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions';
import {push} from 'react-router-redux';
import * as actions from '../../Users/actions';

class Logout extends Component {
  componentDidMount() {

  }
  static get propTypes() {
    return {
      logoutUser: React.PropTypes.func,
            push: React.PropTypes.func
    }
  }

  static get contextTypes()  {
    return {
      router: function() { return React.PropTypes.func.isRequired; }
    }
  }
  render() {
    const logout = function () {
      this.props.logout()
      this.context.router.push('/login')
    }.bind(this)
    return <div>Sorry to see you go!</div>;
  }
}
const actionsToProps = {
      logoutUser: actions.logoutUser,
      push
    }

function mapStateToProps(state) {
    let loading = state.getIn(['Logout', 'user', 'loading'], false);
    let authenticated = state.getIn(['Logout', 'user', 'authenticate'], false);
  return {
    authenticated,
    loading
  }
}
export default connect(null, actions)(Logout);
