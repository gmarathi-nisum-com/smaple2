import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as loginUtils from '../../Login/utils';
import * as actions from '../actions';
import {router, push} from 'react-router-redux';
import {Map, List, fromJS, toJS} from 'immutable';

class AddUserAboutMe extends Component {

  constructor(props) {
    super(props);
    this.state={
        aboutMe: '',
        open: false,
        errorText: '',
        openError: false,
        openSuccess: false,
        useThisToCompareAboutme: '',
        aboutMeRecordId: ''
    }
  }

  static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,  
        saveAboutme: React.PropTypes.func,
        updateAboutme: React.PropTypes.func
      }
    }

  componentWillMount(){
    if(this.props.aboutMeData){
      this.props.aboutMeData.map((data, i)=>{
        if(data.get('aboutMe')){
          // console.log("Check: ", data.get('aboutMe'))
          this.setState({
            aboutMe: data.get('aboutMe'),
            useThisToCompareAboutme: data.get('aboutMe')
          })
        }
        if(data.get('_id')){
          this.setState({
            aboutMeRecordId: data.get('_id')
          })
        }
      })
    }
  }  
  componentWillReceiveProps(nextProps) {
  // console.log("nextProps.success", nextProps.success.length)
  // console.log("nextProps.errors", nextProps.errors.length)
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
  if(nextProps.aboutMeData){
    nextProps.aboutMeData.map((data, i)=>{
        if(data.get('aboutMe')){
          // console.log("Check: ", data.get('aboutMe'))
          this.setState({
            aboutMe: data.get('aboutMe'),
            useThisToCompareAboutme: data.get('aboutMe')
          })
        }
        if(data.get('_id')){
          this.setState({
            aboutMeRecordId: data.get('_id')
          })
        }
      })
  }
}
  changeAboutme = (evt) => {
    this.props.aboutMeData.map((data, i)=>{
      if(data.get('_id')){
        this.setState({
          aboutMeRecordId: data.get('_id')
        })
      }
    })
    this.setState({
        aboutMe: evt.target.value
      });
  }
  handleRequestClose = () => {
      this.setState({
        open: false,
        openError: false,
        openSuccess: false
      });
    };
   handleTouchTap = () => {

     if(this.state.aboutMe == '' || this.state.aboutMe == null){
      this.setState({
      errorText: "About you cannot be empty",
    });
    }else{
      this.setState({
        errorText: ''
      });
      var data = {};
      data.aboutMe = this.state.aboutMe;
      data.userId = this.props.loginId;
      this.props.saveAboutme(data);

      setTimeout(() => {
          this.props.getAboutme(this.props.loginId);
      }, 1000);

    }
  };

  handleTouchTapUpdate = () => {

    if(this.state.aboutMe == '' || this.state.aboutMe == null){
      this.setState({
      errorText: "About you cannot be empty"
    });
    }else if(this.state.aboutMe.trim() == this.state.useThisToCompareAboutme.trim()){
      this.setState({
      errorText: "There is nothing changed to update. Please modify and try"
    });
    }
    else{
      this.setState({
        errorText: ''
      });
      var data = {};
      data.aboutMe = this.state.aboutMe;
      // console.log("about me : ", this.state.aboutMe)
      // console.log("aboutMeRecordId : ", this.state.aboutMeRecordId)
      this.props.updateAboutme(this.state.aboutMeRecordId, data);

      setTimeout(() => {
          this.props.getAboutme(this.props.loginId);
      }, 1000);

    }
  };
  render() {
    const {aboutMeData} = this.props;
    // console.log("aboutMeData: ", this.props.aboutMeData)
    return (
     <div className="cold-md-12">
        {this.state.open ? <imports.Snackbar
            open={this.state.open}
            message={this.state.error}
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyle}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          />: ''}
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
        <div className="col-md-10">
        <imports.TextField multiLine={true} errorText={this.state.errorText} errorStyle={myTheme.errorStyle} style={{width: 500}} rowsMax={8} underlineStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineFocusStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="About you" hintText="Enter About you" value={this.state.aboutMe} onChange={this.changeAboutme} name="aboutMe" />
        </div>
          <div className="col-md-2" style={{marginTop: 20}}>
          
          {(this.props.aboutMeData == undefined || this.props.aboutMeData.size < 1) && (<imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTap}>
                {this.props.loading && 'Saving'}
                {!this.props.loading && 'Add'}
          </imports.RaisedButton>)}

          {this.props.aboutMeData.size > 0 && (<imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTapUpdate}>
             {!this.props.updateLoading && 'Update'}
             {this.props.updateLoading && 'Updating'}
          </imports.RaisedButton>)}

         
          </div>
            
           
     </div>
     </div>
    );
  }
}

function mapStateTopropsUserAboutme(state) {
      const user = loginUtils.getCurrentUser(state)
    let userName = `${user.get("firstName")} ${user.get("lastName")}`;
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    let dob = user.get('dob');
    let loginId = user.get('id')

    let loading = state.getIn(['MyProfile', 'user', 'aboutMe', 'loading'], false)

    let success = state.getIn(['MyProfile', 'user', 'aboutMe', 'success'], '')
    // console.log("success: ", success)
    let error = state.getIn(['MyProfile', 'user', 'aboutMe', 'errors'], '')

    let updateLoading = state.getIn(['MyProfile', 'user', 'updateAboutme', 'loading'], false)

    let updateSuccess = state.getIn(['MyProfile', 'user', 'updateAboutme', 'success'], '')
    if(updateSuccess){
      success = state.getIn(['MyProfile', 'user', 'updateAboutme', 'success'], '')
    }
    // console.log("success: ", success)
    let updateError = state.getIn(['MyProfile', 'user', 'updateAboutme', 'errors'], '')
    if(updateError){
      error = state.getIn(['MyProfile', 'user', 'updateAboutme', 'errors'], '')
    }
  return {user, userName, dob, loginId, loading, success, error, updateLoading, updateSuccess, updateError};
}
const actionsToPropsUserAboutme = {
      saveAboutme: actions.saveAboutme,
      getAboutme: actions.getAboutme,
      updateAboutme: actions.updateAboutme,
      push
    }

const MappedAddUserAboutMe = connect(mapStateTopropsUserAboutme, actionsToPropsUserAboutme)(AddUserAboutMe);

export class AboutMeComponent extends Component {

  constructor(props) {
    super(props);
    this.state={
        enableAddFav: false,
        remove: false
    }
  }
    static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,  
        getAboutme: React.PropTypes.func
      }
    }
  componentDidMount(){
    this.props.getAboutme(this.props.loginId);
  }

    componentWillReceiveProps(nextProps) {
      
    }
  addFav = (evt) => {
      if(this.props.userFavData){
        this.renderMappedAddUserAboutMe()
      }

    this.setState({
        enableAddFav: true,
        remove: true
      });
  }
renderMappedAddUserAboutMe(){
  <MappedAddUserAboutMe/>
}
    editFav = (id, name, value) => {
    // this.setState({
    //     enableAddFav: true,
    //     name: name,
    //     value: value
    //   });

    // console.log("event.id", id, name, value)
  }

  removeMinus = (evt) => {
  this.setState({
      enableAddFav: false,
      remove: false
    });
  }
handleRequestDelete = () => {
  
}

handleClick = () => {
  
}

  handleRequestClose = () => {
      this.setState({
        openChipSuccess: false,
        openChipError: false
      });
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
    // console.log("Parent component renders")
    const {aboutMeData} = this.props;
    let rows = [];
    if(aboutMeData){
      this.props.aboutMeData.map( (data, i) => {
      rows.push(
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <span key={i} style={{color: '#333'}}>{data.get('aboutMe')}</span>
          </div>
        )
    });
    }
    
    return (
     <div>
                    <imports.Card style={myTheme.cardStyle}>
                            <imports.CardHeader
                              title="About you"
                              style={myTheme.cardHeaderStyle}
                              titleStyle={myTheme.contentStyle}
                            >
                            
                            {this.state.remove ?  (<imports.IconButton tooltip="Collapse" style={{float: 'right', height: 'unset', marginTop:9}}  iconStyle={{marginTop: -25, color: myTheme.color}} onClick={this.removeMinus}>
                                <imports.Remove/>
                            </imports.IconButton>):

                           
                            (<imports.IconButton style={{float: 'right', height: 'unset', marginTop:9}} tooltip="Expand" iconStyle={{marginTop: -25, color: myTheme.color}} onClick={this.addFav}>
                                <imports.ContentAdd/>
                            </imports.IconButton>)}
                            
                            </imports.CardHeader>
                        <imports.Divider style={myTheme.dividerStyle} inset={true}/>
                        <imports.CardText style={{position: 'relative'}}>
                          {this.state.enableAddFav ? <MappedAddUserAboutMe aboutMeData={this.props.aboutMeData}/>: null }
                            {this.props.updateLoading ? this.renderLoading(): null}
                            {this.props.aboutMeloading ? this.renderLoading(): null}
                            {rows.length > 0 && (<div className="row" style={{display:'flex'}}>
                            {rows}
                          </div>)}
                          {!this.props.aboutMeloading && rows.length ==0 && (<h2>You haven't added anything about you. Please add</h2>)}
                        </imports.CardText>
                      </imports.Card>       

     </div>
    );
  }
}

function mapStateToPropsAbouMe(state) {
      const user = loginUtils.getCurrentUser(state)
    let userName = `${user.get("firstName")} ${user.get("lastName")}`;
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    let dob = user.get('dob');
    let loginId = user.get('id')

    let aboutMeloading = state.getIn(['MyProfile', 'getUser', 'aboutMe', 'loading'], false)

    let aboutMeData = state.getIn(['MyProfile', 'getUser', 'aboutMe', 'success'], List())
    // console.log("userFavData: ", JSON.stringify(userFavData, undefined, 2))
    let aboutMeError = state.getIn(['MyProfile', 'getUser', 'aboutMe', 'errors'], '')
    let updateLoading = state.getIn(['MyProfile', 'user', 'updateAboutme', 'loading'], false)
    // console.log("aboutMeData: ", JSON.stringify(aboutMeData))
  return {userName, dob, loginId, aboutMeloading, aboutMeData, aboutMeError, updateLoading};
}
const actionsToPropsAbouMe = {
      getAboutme: actions.getAboutme,
      push
}
export default connect(mapStateToPropsAbouMe, actionsToPropsAbouMe)(AboutMeComponent);