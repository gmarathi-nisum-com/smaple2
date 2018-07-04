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

class About extends Component {
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
              <h1>WHO WE ARE & WHAT WE DO...</h1> 
            </div>
          </div>
        </div>
        <div>
           <imports.Tabs inkBarStyle={{backgroundColor: '#333', height:3}} onChange={this.handleChange} value={this.state.slideIndex}>
            <imports.Tab 
              label="About"
              value={0}
            >
            <div style={{marginLeft: '20%', marginRight: '20%'}}>
            <br />
              <h2>Do you like what we do? Want to innovate with us? Get in touch with us!</h2>
            <h3>What is Newpost?</h3>
        <p>Newpost is available for use at more than 2,50,000 online and offline avenues. Get kwik, hassle-free payments that are super-secure! Use the wallet app to browse the biggest online, retail and fashion stores. Get going now!</p>

        <p>Newpost is super-safe. Each and every penny stored in your wallet is well accounted for. You can also use the extra in-app security settings available on all mobile platforms Newpost is operational on. These are Android, Windows and iOS. All services of MobiKwik are also available via a desktop site and a mobile site.</p>

        <p>Newpost received the coveted PrePaid Payment Instrument license from the Reserve Bank of India on 18 July, 2013.</p>
        
       
       
        <h3>Why Use Newpost: </h3>
         <p>Newpost is super-safe. Each and every penny stored in your wallet is well accounted for. You can also use the extra in-app security settings available on all mobile platforms Newpost is operational on. These are Android, Windows and iOS. All services of MobiKwik are also available via a desktop site and a mobile site.</p>

        <p>Newpost received the coveted PrePaid Payment Instrument license from the Reserve Bank of India on 18 July, 2013.</p>
      
          </div>
          </imports.Tab>
            <imports.Tab 
              label="Team"
              value={1}
            >
            <TeamComponent />
          </imports.Tab>
            <imports.Tab 
              label="Careers"
              value={2}
            >
            <Careers />
          </imports.Tab>
            <imports.Tab 
              label="Contact"
              value={3}
            >
              <div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <ContactUsComponent />
                
                  </div>
                </div>
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

export default connect(mapStateToProps, actionsToProps)(About);
