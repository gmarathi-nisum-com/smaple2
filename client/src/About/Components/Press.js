import React, { Component } from 'react';
import { connect } from 'react-redux';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import {push} from 'react-router-redux';
// import * as actions from '../actions';
import {Map, List, fromJS} from 'immutable';
import * as loginUtils from '../../Login/utils';
import TeamComponent from './Team';
import ContactUsComponent from '../../Contact/Components/Contact';
import Careers from './Careers';
class Press extends Component {
constructor(props) {
    super(props);
    this.state = {
        slideIndex: 0
    };
  }
static get propTypes() {
    return {
      loginId:React.PropTypes.string,
      loading: React.PropTypes.bool
    }
  }

componentDidMount(){

}
componentWillReceiveProps(nextProps) {
  
}
handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
  render() {
    const {user, loginId, userName} = this.props; 
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };
    return (
      <div>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{textAlign:'center', backgroundColor: "#fff"}}>
        <div className="container">
            <div className="page-header" style={{border: 'none'}}> 
              <h1>NEWPOST IN THE NEWS...</h1> 
              <h3>Complete coverage of all our innovative work and pioneering efforts! Here's what the media has to say about Newpost.</h3>  
            </div>
          </div>
        </div>
        
        <div>
           <imports.Tabs inkBarStyle={{backgroundColor: '#fff'}} onChange={this.handleChange} value={this.state.slideIndex}>
            <imports.Tab 
              label="PRESS RELEASES"
              value={0}
            >
            
          </imports.Tab>
            <imports.Tab 
              label="MEDIA COVERAGE"
              value={1}
            >
            
          </imports.Tab>
            
          </imports.Tabs>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const user = loginUtils.getCurrentUser(state)
    let loginId;
    let userName = `${user.get("firstName")} ${user.get("lastName")}`
    return{
         user, loginId, userName
      }
}

const actionsToProps = {
     
    }

export default connect(mapStateToProps, actionsToProps)(Press);
