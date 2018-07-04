import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as loginUtils from '../../Login/utils';
import * as actions from '../actions';
import {router, push} from 'react-router-redux';
import {Map, List, fromJS, toJS} from 'immutable';
import {white, indigo600, indigo900} from 'material-ui/styles/colors';

class AskPreferences extends Component {

  constructor(props) {
    super(props);
    this.state={
        positivePreference: '',
        negativePreference: '',
        advicePreference: '',
        openError: false,
        openSuccess: false,
        prefDocumentId: ''
    }
  }

  static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,
        saveAskPref: React.PropTypes.func,
        getAskPreferences: React.PropTypes.func,
        updateAskPref: React.PropTypes.func
      }
    }

  componentWillMount(){
    if(this.props.askPreferencesData){
     this.props.askPreferencesData.map((data, i)=>{
        if(data.get('positive')){
          // console.log("Check123: ", data.get('positive'))
          this.setState({
            positivePreference: data.get('positive')
          })
        }
        if(data.get('negative')){
          // console.log("Check: ", data.get('aboutMe'))
          this.setState({
            negativePreference: data.get('negative')
          })
        }
        if(data.get('positive')){
          // console.log("Check: ", data.get('aboutMe'))
          this.setState({
            advicePreference: data.get('advice')
          })
        }
        if(data.get('_id')){
          // console.log("Check: ", data.get('aboutMe'))
          this.setState({
            prefDocumentId: data.get('_id')
          })
        }
      })
   }
  }  
  componentDidMount(){
    // console.log("Ask preferences: ", this.props.askPreferencesData)
  }
  componentWillReceiveProps(nextProps) {
    // console.log("Ask preferences: ", nextProps.askPreferencesData)
    if(nextProps.success.length > 0){
      this.setState({
        openSuccess: true
      })
    }

    if(nextProps.error.length > 0){
      this.setState({
        openError: true
      })
    }
    if(nextProps.askPreferencesData){
      nextProps.askPreferencesData.map((data, i)=>{
      if(data.get('positive')){
          console.log("Check: ", data.get('positive'))
          this.setState({
            positivePreference: data.get('positive')
          })
        }
        if(data.get('negative')){
          console.log("Check1: ", data.get('negative'))
          this.setState({
            negativePreference: data.get('negative')
          })
        }
        if(data.get('positive')){
          // console.log("Check: ", data.get('aboutMe'))
          this.setState({
            advicePreference: data.get('advice')
          })
        }
        
    })
    }
  }
  changePositive = (evt) => {
    // console.log("Positive: ", evt.target.value)
    this.setState({
      positivePreference: evt.target.value
    })
  }

  changeNegative = (evt) => {
    this.setState({
      negativePreference: evt.target.value
    })
  }

  changeAdvice = (evt) => {
    this.setState({
      advicePreference: evt.target.value
    })
  }
  handleRequestClose = () => {
      this.setState({
        open: false,
        openError: false,
        openSuccess: false
      });
    };
   handleTouchTap = () => {
        if(this.props.askPreferencesData.size <1){
          // console.log("this.props.askPreferencesData", JSON.stringify(this.props.askPreferencesData, undefined, 2))
          if(this.state.positivePreference != "" || this.state.negativePreference != "" ||  this.state.advicePreference != ""){
             var data = {};
            data.positive = this.state.positivePreference;
            data.negative = this.state.negativePreference;
            data.advice = this.state.advicePreference;
            data.userId = this.props.loginId;
            this.props.saveAskPref(data);
            setTimeout(() => {
              this.props.getAskPreferences(this.props.loginId);
          }, 1000);
          }
      }
      if(this.props.askPreferencesData.size > 0){
        if(this.state.positivePreference != "" || this.state.negativePreference != "" ||  this.state.advicePreference != ""){
           var data = {};
          data.positive = this.state.positivePreference;
          data.negative = this.state.negativePreference;
          data.advice = this.state.advicePreference;
          var id = this.state.prefDocumentId;
          this.props.updateAskPref(id, data);
          setTimeout(() => {
            this.props.getAskPreferences(this.props.loginId);
        }, 1000);
        }
      }
  };

  handleTouchTapUpdate = () => {

    
  };
  render() {
    // const {askPreferencesData} = this.props;
    // console.log("aboutMeData: ", this.props.aboutMeData)
    return (
     <div>
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
     <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          {this.props.askPreferencesData && this.props.askPreferencesData.size > 0 ? (<h4>You have already set preferences. If required change your preferences below</h4>) : (<h4>Set your preferences below</h4>)}
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
              <p style={{marginTop: 21}}>Would you like to hear Postive about you from others?</p>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <imports.RadioButtonGroup name="preference" valueSelected={this.state.positivePreference} style={{ marginTop: 20, display: 'flex' }} onChange={this.changePositive}>
              <imports.RadioButton
                value="yes"
                name="yes"
                label='Yes'
                
                labelStyle={myTheme.labelStyle}
                inputStyle={myTheme.inputStyle}
                iconStyle={myTheme.iconStyle}
                />
              <imports.RadioButton
                value='no'
                label='No'
                name='no'
                
                labelStyle={myTheme.labelStyle}
                inputStyle={myTheme.inputStyle}
                iconStyle={myTheme.iconStyle}
                />
            </imports.RadioButtonGroup>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
              <p style={{marginTop: 21}}>Would you like to hear Negative about you from others?</p>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <imports.RadioButtonGroup valueSelected={this.state.negativePreference} name="preference" style={{ marginTop: 20, display: 'flex' }} onChange={this.changeNegative}>
              <imports.RadioButton
                value='yes'
                name="yes"
                label='Yes'
                
                labelStyle={myTheme.labelStyle}
                inputStyle={myTheme.inputStyle}
                iconStyle={myTheme.iconStyle}
                />
              <imports.RadioButton
                value='no'
                label='No'
                name='no'
                
                labelStyle={myTheme.labelStyle}
                inputStyle={myTheme.inputStyle}
                iconStyle={myTheme.iconStyle}
                />
            </imports.RadioButtonGroup>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
              <p style={{marginTop: 21}}>Would you like to hear Advice from others?</p>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <imports.RadioButtonGroup name="preference" valueSelected={this.state.advicePreference} style={{ marginTop: 20, display: 'flex' }} onChange={this.changeAdvice}>
              <imports.RadioButton
                value='yes'
                name="yes"
                label='Yes'
                
                labelStyle={myTheme.labelStyle}
                inputStyle={myTheme.inputStyle}
                iconStyle={myTheme.iconStyle}
                />
              <imports.RadioButton
                value='no'
                label='No'
                name='no'
               
                labelStyle={myTheme.labelStyle}
                inputStyle={myTheme.inputStyle}
                iconStyle={myTheme.iconStyle}
                />
            </imports.RadioButtonGroup>
            </div>
            
        </div>
        <div style={{float: 'right'}}>
           <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTap}>
                {this.props.askPreferencesData && this.props.askPreferencesData.size > 0 ? 'Update' : 'Save'}
            </imports.RaisedButton>
        </div>
     </div>
     <div className="row">
  
     <br />
        <imports.Divider style={myTheme.dividerStyle}/>
        <br /> 
        </div>
     </div>
    );
  }
}

function mapStateToProps(state) {
      const user = loginUtils.getCurrentUser(state)
    let userName = `${user.get("firstName")} ${user.get("lastName")}`;
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    let dob = user.get('dob');
    let loginId = user.get('id')

    let loading = state.getIn(['MyProfile', 'saveAskpref', 'loading'], false)

    let success = state.getIn(['MyProfile', 'saveAskpref', 'success'], '')
    // console.log("success: ", success)
    let error = state.getIn(['MyProfile', 'saveAskpref', 'errors'], '')

    let updateLoading = state.getIn(['MyProfile', 'updateAskpref', 'loading'], false)

    let updateSuccess = state.getIn(['MyProfile', 'updateAskpref', 'success'], '')
    if(updateSuccess){
      success = state.getIn(['MyProfile', 'updateAskpref', 'success'], '')
    }
    // console.log("success: ", success)
    let updateError = state.getIn(['MyProfile', 'updateAskpref', 'errors'], '')
    if(updateError){
      error = state.getIn(['MyProfile', 'updateAskpref', 'errors'], '')
    }
    let askPreferencesData = state.getIn(['MyProfile', 'askPreferences', 'success'], List())
  return {user, userName, dob, loginId, loading, success, error, askPreferencesData};
}

const actionsToProps = {
      saveAskPref: actions.saveAskPref,
      getAskPreferences: actions.getAskPreferences,
      updateAskPref: actions.updateAskPref,
      push
    }

const MappedAskPreferencesComponent = connect(mapStateToProps, actionsToProps)(AskPreferences);

export class AskPrefList extends Component{

  render(){

    return(
        <div style={{marginLeft:30, marginRight: 50}}>
          <imports.Chip style={{width: 100, backgroundColor: '#8c8876ad'}}>
            <imports.Avatar size={32} color={myTheme.color}>{this.props.prefName}</imports.Avatar>
              {this.props.pref}
          </imports.Chip>
        </div>
    )
  }
}
export class AskPreferencesComponent extends Component {

  constructor(props) {
    super(props);
    this.state={
        expandPref: false,
        collapsePref: false
    }
  }
    static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,  
        getAskPreferences: React.PropTypes.func
      }
    }
  componentDidMount(){
    this.props.getAskPreferences(this.props.loginId);
  }

    componentWillReceiveProps(nextProps) {
      if(nextProps.success){
         if(nextProps.success.length > 0){
            this.setState({
              expandPref: false,
              collapsePref: false
            })
          }
      }
     
    }
  expandPref = (evt) => {
      // if(this.props.askPreferencesData){
      //   // this.renderAskPreferences()
      // }

    this.setState({
        expandPref: true,
        collapsePref: true,

      });
  }
// renderAskPreferences(){
//   <MappedAskPreferencesComponent />
// }
    editFav = (id, name, value) => {
    // this.setState({
    //     enableAddFav: true,
    //     name: name,
    //     value: value
    //   });

    // console.log("event.id", id, name, value)
  }

  collapsePref = (evt) => {
  this.setState({
      expandPref: false,
      collapsePref: false
    });
  }
handleRequestDelete = () => {
  
}

handleClick = () => {
  
}

  handleRequestClose = () => {
      
    };
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
    const {askPreferencesData} = this.props;
    let rows = [];
    // console.log("askPreferencesData: ", askPreferencesData)
    let text = "You already have preferences set";
    if(askPreferencesData){
      console.log("True")
      this.props.askPreferencesData.map( (data, i) => {
      if(data.get('positive') != ""){
        rows.push(
          <AskPrefList key={1} prefName="P" pref={data.get('positive')} />
        )
      }
      if(data.get('negative') != ""){
         rows.push(
          <AskPrefList key={2} prefName="N" pref={data.get('negative')} />
        )
      }
      if(data.get('advice') != ""){
         rows.push(
          <AskPrefList key={3} prefName="A" pref={data.get('advice')} />
        )
      }
     if(data.get('positive') == "" && data.get('negative') == "" && data.get('advice') == ""){
        text = "";
      }
    });
    }

    
    
    return (
     <div>
                    
                    <imports.Card style={myTheme.cardStyle}>
                            <imports.CardHeader
                              title="Ask Preferences"
                              style={myTheme.cardHeaderStyle}
                              subtitleColor={myTheme.color}
                              titleStyle={myTheme.contentStyle}
                            >
                            
                            {this.state.collapsePref ?  (<imports.IconButton tooltip="Collapse" style={{float: 'right', height: 'unset', marginTop:9}}  iconStyle={{marginTop: -25, color: myTheme.color}} onClick={this.collapsePref}>
                                <imports.Remove />
                            </imports.IconButton>):

                           
                            (<imports.IconButton style={{float: 'right', height: 'unset', marginTop:9}} tooltip="Expand" iconStyle={{marginTop: -25, color: myTheme.color}} onClick={this.expandPref}>
                                <imports.ContentAdd />
                            </imports.IconButton>)}
                            
                            </imports.CardHeader>
                        <imports.Divider style={myTheme.dividerStyle} inset={true}/>
                        <imports.CardText style={{position: 'relative'}}>
                          {this.props.askPreferencesloading ? this.renderLoading(): null}
                          {this.props.updateLoading ? this.renderLoading(): null}
                          {this.state.expandPref ? <MappedAskPreferencesComponent askPreferencesData={this.props.askPreferencesData} loginId={this.props.loginId} />: null }

                          {rows.length > 0 && (
                            <div>
                              <div className="row" style={{textAlign: 'center'}}>
                                <h4>{text}</h4>
                              </div>
                              <div className="row" style={{display:'flex'}}>
                                {rows}
                              </div>
                            </div>
                            )}
                          {!this.props.askPreferencesloading && rows.length ==0 && (<h2>You haven't set preferences yet. Please set.</h2>)}
                        </imports.CardText>
                      </imports.Card>       

     </div>
    );
  }
}

function mapStateToPropsPref(state) {
    const user = loginUtils.getCurrentUser(state)
    let userName = `${user.get("firstName")} ${user.get("lastName")}`;
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    let dob = user.get('dob');
    let loginId = user.get('id')
    let askPreferencesloading = state.getIn(['MyProfile', 'askPreferences', 'loading'], false)
    let askPreferencesData = state.getIn(['MyProfile', 'askPreferences', 'success'], List())
    let askPreferencesError = state.getIn(['MyProfile', 'askPreferences', 'errors'], '')
    let updateLoading = state.getIn(['MyProfile', 'updateAskpref', 'loading'], false)
    // console.log("askPreferencesData: ", JSON.stringify(askPreferencesData, undefined, 2))
  return {userName, dob, loginId, askPreferencesloading, askPreferencesData, askPreferencesError, updateLoading};
}
const actionsToPropsPref = {
    getAskPreferences:actions.getAskPreferences,
    push
}
export default connect(mapStateToPropsPref, actionsToPropsPref)(AskPreferencesComponent);