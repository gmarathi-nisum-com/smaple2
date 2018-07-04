import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as loginUtils from '../../Login/utils';
import AutoComplete from 'material-ui/AutoComplete';
import * as searchActions from '../../Search/actions';
import {Map, List, fromJS} from 'immutable';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import MenuItem from 'material-ui/MenuItem';
import * as actions from '../actions';
import * as myProfileActions from '../../MyProfile/actions';
import {indigo500} from 'material-ui/styles/colors';
import config from '../../Config'

export class AskPrefList extends Component{

  render(){

    return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <imports.List>
            <imports.ListItem
              leftIcon={<imports.Info color={indigo500} />}
              primaryText={this.props.prefName}
              secondaryText={this.props.prefValue}
              style={{color: config.textColor}}
            />
          </imports.List>

        </div>
    )
  }
}
export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      positive: '',
      negative: '',
      advice: '',
      selectedFriendId: '',
      addPostSuccess: '',
      addPostError: '',
      page: 1
    };
  }

  static get propTypes() {
    return {
      loginId:React.PropTypes.string,
      loading: React.PropTypes.bool,
      fetchUsers : React.PropTypes.func,
      postData: React.PropTypes.func,
      clearState: React.PropTypes.func,
      getPostData: React.PropTypes.func,
      getUserPreferences: React.PropTypes.func
    }
  }
  componentWillMount(){
    this.props.clearState();
  }
  componentDidMount(){
    this.props.fetchUsers();
    if(this.props.userId != this.props.loginId){
      // let data = {};
      // data.postedTo = this.props.userId;
      // data.postedBy = this.props.loginId;
      this.props.getPostData(this.props.userId, this.props.loginId);
      this.props.getUserPreferences(this.props.userId);
    }
  }

componentWillReceiveProps(nextProps) {
  if(nextProps.addpostSuccess){
    if(nextProps.addpostSuccess.length > 0){
      // console.log("addpostSuccess message: ", nextProps.addpostSuccess)
      this.setState({
        addPostSuccess: nextProps.addpostSuccess
      })
      setTimeout(()=>{
        $('#Common-modalId').modal('hide');
          this.props.clearState();
      }, 3000)
    }
  }

  if(nextProps.addpostError){
    if(nextProps.addpostError.size > 0){
      // console.log("addposterror message: ", nextProps.addpostError)
      this.setState({
        addPostError: nextProps.addpostError
      })
      setTimeout(()=>{
        $('#Common-modalId').modal('hide');
          this.props.clearState();
      }, 3000)
    }
  }

    if(nextProps.positive){
    if(nextProps.positive.length > 0){
      // console.log("addposterror message: ", nextProps.addpostError)
      this.setState({
        positive: nextProps.positive
      })
    }
  }
  if(nextProps.negative){
    if(nextProps.negative.length > 0){
      // console.log("addposterror message: ", nextProps.addpostError)
      this.setState({
        negative: nextProps.negative
      })
    }
  }

  if(nextProps.advice){
    if(nextProps.advice.length > 0){
      // console.log("addposterror message: ", nextProps.addpostError)
      this.setState({
        advice: nextProps.advice
      })
    }
  }
  
}
componentWillUnMOunt(){

}
handleTouchTap = () => {
    if(this.state.positive == '' || this.state.positive == null || this.state.negative == '' || this.state.negative == null || this.state.advice == '' || this.state.advice == null){
      this.setState({
      error: "Atleast one reuired"
    });
    }
    else{
      this.setState({
        error: ''
      });
      if(this.props.userId == this.props.loginId){
        var data = {};
        data.positive = this.state.positive;
        data.negative = this.state.negative;
        data.advice = this.state.advice;
        data.postedTo = this.state.selectedFriendId;
        data.postedBy = this.props.loginId;
        this.props.postData(data);
      }else{
        var data = {};
        data.positive = this.state.positive;
        data.negative = this.state.negative;
        data.advice = this.state.advice;
        data.postedTo = this.props.userId;
        data.postedBy = this.props.loginId;
        this.props.postData(data);
      }
    }
  };

handleTouchTapUpdate = () => {
    if(this.state.positive == '' || this.state.positive == null || this.state.negative == '' || this.state.negative == null || this.state.advice == '' || this.state.advice == null){
      this.setState({
      error: "Atleast one required"
    });
    }
    else{
      this.setState({
        error: ''
      });
        var data = {};
        data.positive = this.state.positive;
        data.negative = this.state.negative;
        data.advice = this.state.advice;
        data.postedTo = this.props.userId;
        data.postedBy = this.props.loginId;
        data._id = this.props._id;
        this.props.postData(data);
    }
  };
    

  changePositive = (evt) => {
    this.setState({
        positive: evt.target.value,
        error:''
      });
  }

  changeNegative = (evt) => {
    this.setState({
        negative: evt.target.value,
        error:''
      });
  }

  changeAdvice = (evt) => {
    this.setState({
        advice: evt.target.value,
        error:''
      });
  }
  handleRequestClose = () => {
      this.setState({
        error: ''
      });
    };

 onUpdateInput = (inputValue) => {
  const self = this;
  this.setState({
    inputValue: inputValue
  }, function() {
    // self.performSearch();
  });
}
handleNewRequest = (i, value) => {
  // console.log("test: ", i.id)
  this.setState({
    assignedValue: i,
    selectedFriendId: i.id
  })
  this.props.getPostData(i.id, this.props.loginId);
  this.props.getUserPreferences(i.id);

}
handleUpdateInput = (searchText, dataSource, params) => {
  this.setState({
    searchText:searchText,
    assignedValue: searchText
  })
}
handleContinue = () => {
  this.setState({
    page:2
  })
}

handlePrevious = () => {
  this.setState({
    page:1
  })
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
     const {askPreferencesData} = this.props;
      let rows = [];
      // console.log("askPreferencesData: ", askPreferencesData)
      if(askPreferencesData){
        this.props.askPreferencesData.map( (data, i) => {
        if(data.get('positive') != ""){
           rows.push(
            <AskPrefList key={1} prefName="Positive" prefValue={data.get('positive')} />
          )
           // rows.push(<imports.Divider />)
        }
        if(data.get('negative') != ""){
           rows.push(
            <AskPrefList key={2} prefName="Negative" prefValue={data.get('negative')} />
          )
          // rows.push(<imports.Divider />)
        }
        if(data.get('advice') != ""){
           rows.push(
            <AskPrefList key={3} prefName="Advice" prefValue={data.get('advice')} />
          )
        }
       rows.push(<br />);
      });
    }
     const menuProps = {
        desktop: true,
        disableAutoFocus: false
      };
      var dataSource = [];
      // console.log("User Data: ", JSON.stringify(this.props.usersData))
      if(this.props.usersData.size>0){
         this.props.usersData.forEach((data, i) => {
          // console.log("Data: ", data)
        let fullName = data.get('firstName') +" "+data.get('lastName');
          // console.log("fullName: ", fullName)
          // console.log("ID: ", data.get('_id'))
        if(this.props.loginId != data.get('_id')){
          let path = `${data.get('_id')}/profile`;
          dataSource.push({
            text: fullName,
            value: (
              <MenuItem
                primaryText={fullName}
                leftIcon={<img style={{borderRadius:'50%'}} src="https://scontent.fmaa2-2.fna.fbcdn.net/v/t1.0-1/c0.0.240.240/p240x240/734639_408519615899263_348278322_n.jpg?_nc_cat=0&oh=9a3278bf7105809497af80faeff37f7d&oe=5BA9D05A" />}
                maxHeight={100}
                onMouseEnter={(e) => e.target.style.color = myTheme.black}
                onMouseLeave={(e) => e.target.style.color =  myTheme.black}
                style={{color:  myTheme.black, borderBottom: '1px solid #3333'}}
                innerDivStyle={{}}
              />
            ),
            id: data.get('_id'),
            email: data.get('email')
          });
        }
      });
      }
    return (
      <div>
          {this.state.page == 1 && (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {this.props.userId == this.props.loginId && this.state.page ==1 && (
                <div>
                  <h2>Select your friend below to post your comments</h2>
                  <AutoComplete
                      floatingLabelText="Select Friend"
                      hintText="Search with name"
                      dataSource = {dataSource}
                      style={{marginTop: '-20px'}}
                      listStyle={{ maxHeight: 200, overflow: 'auto' }}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                      animated={true}
                      openOnFocus={true}
                      fullWidth={true}
                      onNewRequest= {this.handleNewRequest}
                      onUpdateInput={this.handleUpdateInput}
                      filter={AutoComplete.noFilter}       
                      errorStyle={myTheme.errorStyle}
                      inputStyle={myTheme.inputStyleText} underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle}
                    />

                  </div>
                )}
              {rows.length > 0 && (
                  <div>
                    <h2>User Preferences</h2>
                    <h4>Please check user preferences below before you post comments</h4>
                    {rows}
                  </div>
                )}
                 
              {this.state.page == 1 && (
                <div style={{float: 'right', marginRight: 20}}>
                  <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleContinue}>
                    Continue
                  </imports.RaisedButton>
              </div>
              )}
            </div>
          )}
          {this.state.page == 2 && (
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h1>Post your feedback about your loved one here</h1>
            <h3>It's free and always will be.</h3>
            {this.props.addpostLoading ? this.renderLoading(): null}
              {this.props.addpostSuccess && this.props.addpostSuccess.length>0 ? (
                <div className="alert alert-success alert-dismissible">
                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                  <strong>Success!</strong> {this.props.addpostSuccess}
                </div>
              ): ''}
              
              {this.props.getpostSuccess && this.props.getpostSuccess.size > 0 ? 
                (<h5>You already posted for this user. Please update the comments if you would like to do</h5>) : ''}
              {this.props.addpostError && this.props.addpostError.size>0 ? (
                <div className="alert alert-success alert-dismissible">
                  <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                  <strong>Danger!</strong> {this.props.addpostError}
                </div>
              ): ''}
              
              
              <imports.TextField
                fullWidth={true}
                multiLine={true}
                textareaStyle={myTheme.inputStyleText}
                rowsMax={6}
                errorText={this.state.error} errorStyle={myTheme.errorStyle}
                inputStyle={myTheme.inputStyleText} underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Positive" value={this.state.positive} onChange={this.changePositive} name="positive"
                hintText="Enter Positive about your friend" />
             
              <imports.TextField
                fullWidth={true}
                multiLine={true}
                rowsMax={6}
                textareaStyle={myTheme.inputStyleText}
                errorText={this.state.error} errorStyle={myTheme.errorStyle}
                inputStyle={myTheme.inputStyleText} underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Negative" value={this.state.negative} onChange={this.changeNegative} name="negative"
                hintText="Enter Negative about your friend/colleague/Family member etc.." />
              <br />
             <imports.TextField
                fullWidth={true}
                multiLine={true}
                rowsMax={6}
                textareaStyle={myTheme.inputStyleText}
                errorText={this.state.error} errorStyle={myTheme.errorStyle}
                inputStyle={myTheme.inputStyleText} underlineStyle={myTheme.underlineStyle} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Advice" value={this.state.advice} onChange={this.changeAdvice} name="advice"
                hintText="Enter Advice if you have any.." />
              
              {this.props.getpostSuccess && this.props.getpostSuccess.size > 0 ? (
              <div style={{float: 'right', marginRight: 20}}>
                <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTapUpdate}>
                  Update
                </imports.RaisedButton>
              </div>):
              (<div style={{float: 'right', marginRight: 20}}>
                <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTap}>
                  Save
                </imports.RaisedButton>
              </div>)}

              
                <div style={{float: 'left'}}>
                  <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handlePrevious}>
                    Back
                  </imports.RaisedButton>
              </div>
            </div>
              
              )}
        </div>
    );
  }
}

function mapStateToProps(state) {
   const user = loginUtils.getCurrentUser(state)
    let loginId;
    if(user.size > 0){
      loginId = user.get('id');
    }
    // $('#Common-modalId').modal('hide');
    let usersLoading = state.getIn(['Search', 'users', 'loading'], false);
    let usersData = state.getIn(['Search', 'users', 'all'], List())
    let usersError = state.getIn(['Search', 'users', 'error'], List())
    let addpostLoading = state.getIn(['Post', 'add', 'loading'], false);
    let addpostSuccess = state.getIn(['Post', 'add', 'success'], List())
    let addpostError = state.getIn(['Post', 'add', 'error'], List())
    let getpostLoading = state.getIn(['Post', 'get', 'loading'], false);
    let getpostSuccess = state.getIn(['Post', 'get', 'success'], List())
    let getpostError = state.getIn(['Post', 'get', 'error'], List())
    let askPreferencesloading = state.getIn(['MyProfile', 'askPreferences', 'loading'], false)
    let askPreferencesData = state.getIn(['MyProfile', 'askPreferences', 'success'], List())
    let askPreferencesError = state.getIn(['MyProfile', 'askPreferences', 'errors'], '')
    
    var postedTo = '';
    var postedBy = '';
    var _id = '';
    var positive = '';
    var negative = '';
    var advice = '';
    if(getpostSuccess.size>0){
      getpostSuccess.map((data, i)=>{
         postedTo = data.get('postedTo');
         postedBy = data.get('postedBy');
         _id = data.get('_id');
         positive = data.get('positive');
         negative = data.get('negative');
         advice = data.get('advice');
      })
    }
    // console.log("addpostLoading: ", addpostLoading)
    // console.log("getpostSuccess: ", JSON.stringify(getpostSuccess, undefined, 2));
    // console.log("userPreferenceData: ", userPreferenceData)
  return {
    loginId, usersData, usersLoading, usersError, addpostLoading, 
    addpostSuccess, addpostError, getpostLoading, getpostSuccess, getpostError,
    postedTo, postedBy, _id, positive, negative, advice, askPreferencesData, askPreferencesloading, askPreferencesError
  };
}

const actionToProps = {
  fetchUsers : searchActions.fetchUsers,
  postData: actions.postData,
  getPostData: actions.getPostData,
  getUserPreferences: myProfileActions.getAskPreferences,
  clearState: actions.clearState
}

export default connect(mapStateToProps, actionToProps)(Post);
