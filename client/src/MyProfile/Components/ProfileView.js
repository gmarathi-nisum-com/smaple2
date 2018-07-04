import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as loginUtils from '../../Login/utils';
import * as actions from '../actions';
import {router, push} from 'react-router-redux';
import {Map, List, fromJS, toJS} from 'immutable';
import AboutMeComponent from './Aboutme';
import AskPreferencesComponent from './AskPreferences';
import WorkAndEducationComponent from './WorkAndEducation';
import PlacesULivedComponent from './PlacesULived';
import Avatar from 'react-avatar';
import config from '../../config';
import Modal from '../../Layout/Components/Modal';
import Cropper from 'react-cropper';
import $ from 'jquery';

class ProfileImageUpload extends Component{

  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: undefined,
      cropResult:undefined
     
    }
     // this.cropImage = this.cropImage.bind(this);
}

onImageDrop = (files) => {
  console.log("Files...", files);
  files.forEach(file =>{
      if(file['size'] > 0){
        const reader = new FileReader();
        reader.onload = (() => {
          const dataURL = reader.result;
          this.setState({uploadedFile:dataURL});
        //   var splited = dataURL.split('base64');
        //   if(splited.length >1){
        //     var buf = Buffer(splited[1], 'base64');
        //     console.log("dataURL buffer: ", buf)
        //   }
        //    var droppedProfilePhotoFile = {
        //     file_name: file['name'],
        //     file_type: file['type'],
        //     file_size: file['size'] + '',
        //     file_data: buf
        //   }
        //   pageData.droppedProfilePhotoFile = droppedProfilePhotoFile;
        //   this.forceUpdate();
        });
        reader.readAsDataURL(file)
      }
    })
}
//  onImageDrop = (e) => {
//     const imageType = /^image\//;
//     const file = e.target.files.item(0);
//   if (!file || !imageType.test(file.type)) {
//     return;
//   }
//   const reader = new FileReader();
//   reader.onload = (e2) => {
//    this.setState({uploadedFile:e2.target.result})
//   };
//   reader.readAsDataURL(file);
// }


  cropImage = () => {
    if (typeof this.cropper.getCroppedCanvas() == 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
    let regex = /^data:.+\/(.+);base64,(.*)$/;
    let dataURL = this.cropper.getCroppedCanvas().toDataURL();
    let matches = dataURL.match(regex);
    let ext = matches[1];
    let dataString = matches[2];
    let buf = null;
    if (typeof Buffer.from === "function") {
      // Node 5.10+
      buf = Buffer.from(dataString, 'base64'); // Ta-da
    } else {
      // older Node versions
      buf = new Buffer(dataString, 'base64'); // Ta-da
    }
      // const splited = dataURL.split('base64');
      // if(splited.length >1){
      //   const buf = Buffer(splited[1], 'base64');
      //   console.log("dataURL buffer: ", splited)
      // }
    // let buffer = Buffer.from(dataString, 'base64');
    let data = {};
    data.loginId = this.props.loginId;
    data.email = this.props.email;
    data.fileData = buf;
    data.fileSize = buf.length;
    data.fileType = ext;
    data.contentType = ext;
    console.log("Buffer....", buf);
    this.props.saveUploadedImage(data);
    setTimeout(() => {
      this.props.getProfileImage(this.props.loginId);
      $('#Common-modalId').modal('hide');
    }, 2000);
    // $('#Common-modalId').modal('hide');
    
  }
    render(){
       const dropzoneStyle = {
          width  : "100%",
          height : "150px",
          border : "2px solid #292961",
          borderStyle: 'dashed'
        };

      return(
        <div>
       {this.state.uploadedFile==undefined && this.state.cropResult==undefined &&  
        <imports.Dropzone
          multiple={false}
          accept="image/*"
          style={dropzoneStyle}
          onDrop={this.onImageDrop}>
          <div style={{margin: '4.5% 0% 30% 30%'}}>Drag and drop or click to select a 170x170 file to upload.</div>
        </imports.Dropzone>
      }

        {this.state.uploadedFile && <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="col-md-4 col-sm-4 col-xs-4">
              <h2>Uploaded Image</h2>
              <Cropper
                ref={cropper => { this.cropper = cropper; }}
                src={this.state.uploadedFile}
                style={{height: 400}}
                aspectRatio={22 / 22}
                guides={false}
                dragMode="crop"
                responsive={true}
                center={true}
                autoCrop={true}
                autoCropaArea="1"
                rotatable={true}
                scalable={true}
                zoomable={true}
                zoomOnTouch={true}
                zoomOnWheel={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                toggleDragModeOnDblclick={true}
                preview=".img-preview"
              />
            </div>

            <div className="col-md-4 col-sm-4 col-xs-4" style={{float: 'right'}}>
              <h2>Cropped Image</h2> 
              {this.state.cropResult ? <img style={{ height: 400 }} src={this.state.cropResult} alt="cropped image" /> :null}
            </div>
          </div>}

         <div style={{float : 'right', marginTop: 40}}>
            <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.cropImage}>
                      Save
            </imports.RaisedButton>
          </div>


        </div>)
    }
}

function mapStateTopropsImageUpload(state) {
      const user = loginUtils.getCurrentUser(state)
    let loginId = user.get('id')
    let email = user.get('email')

    let loading = state.getIn(['MyProfile', 'user', 'fav', 'loading'], false)
    
  return {loginId, loading, email};
}

const actionsToPropsImageUpload = {
      saveUploadedImage: actions.saveUploadedImage,
      getProfileImage: actions.getProfileImage,
      push
    }

const ProfileImage = connect(mapStateTopropsImageUpload, actionsToPropsImageUpload)(ProfileImageUpload);


class CoverPhotoUpload extends Component{
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: undefined,
      cropResult:undefined
    }
  }

  onImageDrop = (files) => {
    files.forEach(file =>{
        if(file['size'] > 0){
          const reader = new FileReader();
          reader.onload = (() => {
            const dataURL = reader.result;
            this.setState({uploadedFile:dataURL});
          });
          reader.readAsDataURL(file)
        }
      })
  }

  cropImage = () => {
    if (typeof this.cropper.getCroppedCanvas() == 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
    let regex = /^data:.+\/(.+);base64,(.*)$/;
    let dataURL = this.cropper.getCroppedCanvas().toDataURL();
    let matches = dataURL.match(regex);
    let ext = matches[1];
    let dataString = matches[2];
    let buf = null;
    if (typeof Buffer.from === "function") {
      // Node 5.10+
      buf = Buffer.from(dataString, 'base64'); 
    } else {
      // older Node versions
      buf = new Buffer(dataString, 'base64'); 
    }

    let data = {};
    data.loginId = this.props.loginId;
    data.email = this.props.email;
    data.fileData = buf;
    data.fileSize = buf.length;
    data.fileType = ext;
    data.contentType = ext;
    this.props.saveCoverPhoto(data);
    setTimeout(() => {
      this.props.getCoverPhoto(this.props.loginId);
      $('#Common-modalId').modal('hide');
    }, 2000);
    // $('#Common-modalId').modal('hide');
    
  }
    render(){
       const dropzoneStyle = {
          width  : "100%",
          height : "150px",
          border : "2px solid #292961",
          borderStyle: 'dashed'
        };

      return(
        <div>
       {this.state.uploadedFile==undefined && this.state.cropResult==undefined &&  
        <imports.Dropzone
          multiple={false}
          accept="image/*"
          style={dropzoneStyle}
          onDrop={this.onImageDrop}>
          <div style={{margin: '4.5% 0% 30% 30%'}}>Drag and drop or click to select a 170x170 file to upload.</div>
        </imports.Dropzone>
      }

        {this.state.uploadedFile && <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="col-md-4 col-sm-4 col-xs-4">
              <h2>Uploaded Image</h2>
              <Cropper
                ref={cropper => { this.cropper = cropper; }}
                src={this.state.uploadedFile}
                style={{height: 800, width:1000}}
                aspectRatio={2000/ 3000}
                guides={false}
                dragMode="crop"
                responsive={true}
                center={true}
                autoCrop={true}
                autoCropaArea="5"
                rotatable={true}
                scalable={true}
                zoomable={true}
                zoomOnTouch={true}
                zoomOnWheel={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                toggleDragModeOnDblclick={true}
                preview=".img-preview"
              />
            </div>
          </div>}

         <div style={{float : 'right', marginTop: 40}}>
            <imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.cropImage}>
                      Save
            </imports.RaisedButton>
          </div>


        </div>)
    }
}

function mapStateTopropsCoverUpload(state) {
      const user = loginUtils.getCurrentUser(state)
    let loginId = user.get('id')
    let email = user.get('email')
  return {loginId, email};
}

const actionsToPropsCoverUpload = {
      saveCoverPhoto: actions.saveCoverPhoto,
      getCoverPhoto: actions.getCoverPhoto,
      push
    }

const CoverPhoto = connect(mapStateTopropsCoverUpload, actionsToPropsCoverUpload)(CoverPhotoUpload);


class AddUserFav extends Component {

  constructor(props) {
    super(props);
    this.state={
        name: '',
        value: '',
        open: false,
        error: '',
        openError: false,
        openSuccess: false,
        chipId: ''
    }
    this.changeLabel = this.changeLabel.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.handleTouchTapUpdate = this.handleTouchTapUpdate.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,  
        saveUserFav: React.PropTypes.func,
        updateUserFav: React.PropTypes.func
      }
    }
    componentWillMount(){
       if(this.props.dataFromStore){
         if(this.props.dataFromStore.size > 0){
           // console.log("check: ", JSON.stringify(this.props.dataFromStore))
           let data = this.props.dataFromStore.toJS();
           this.setState({
            name: data.name,
            value: data.value,
            chipId: data.id
           })
        }  
      } 
    }

    componentDidMount(){
    //    if(this.props.dataFromStore.size > 0){
    //      // console.log("check: ", JSON.stringify(this.props.dataFromStore))
    //      let data = this.props.dataFromStore.toJS();
    //      this.setState({
    //       name: data.name,
    //       value: data.value,
    //       chipId: data.id
    //      }) 
    // }   
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

  
 if(nextProps.dataFromStore){
   if(nextProps.dataFromStore.size > 0){
    let data = nextProps.dataFromStore.toJS();
            // console.log("check: ", data.get('name'))
            this.setState({
                name: data.name,
                value: data.value,
                chipId: data.id
            })
      }
    }
}
  changeLabel(evt) {
    this.setState({
        name: evt.target.value
      });
  }

  changeValue(evt) {
    this.setState({
        value: evt.target.value
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

     if(this.state.name == '' || this.state.name == null){
      this.setState({
      error: "Name cannot be empty",
      open: true
    });
    }else if(this.state.name.length > 25){
      this.setState({
      error: "Can't Add! Please keep your favorites name short",
      open: true
    });
    }else if(this.state.value.length > 30){
      this.setState({
      error: "Can't Add! Please keep your favorites value short",
      open: true
    });
    }else if(this.state.value == '' || this.state.value == null){
      this.setState({
      error: "Value cannot be empty",
      open: true
    });
    }
    else{
      this.setState({
        open: false
      });
      var data = {};
      data.name = this.state.name;
      data.value = this.state.value;
      data.userId = this.props.loginId;
      this.props.saveUserFav(data);

      setTimeout(() => {
          this.props.getUserFav(this.props.loginId);

      }, 1000);
    }
  };


   handleTouchTapUpdate = () => {

     if(this.state.name == '' || this.state.name == null){
      this.setState({
      error: "Name cannot be empty",
      open: true
    });
    }else if(this.state.value == '' || this.state.value == null){
      this.setState({
      error: "Value cannot be empty",
      open: true
    });
    }
    else{
      this.setState({
        open: false
      });
      var data = {};
      data.name = this.state.name;
      data.value = this.state.value;
      data.userId = this.props.loginId;
      // console.log("Name: ", this.state.name)
      //  console.log("Value: ", this.state.value)
      //   console.log("userId: ", this.props.loginId)
      //    console.log("ChipId: ", this.state.chipId)
      this.props.updateUserFav(this.state.chipId, data);
      // this.props.saveToStore({id:this.state.ChipId, name:this.state.name, value:this.state.value, userId: this.props.loginId});

      setTimeout(() => {
          this.props.getUserFav(this.props.loginId);
      }, 1000);
    }
  };
  render() {
    const {dataFromStore} = this.props;
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
        <div className="col-md-5">
        <imports.TextField maxLength={25} underlineStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineFocusStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Favourite Name" hintText="Enter Fav Name" value={this.state.name} onChange={this.changeLabel} name="name" />
        </div>
        <div className="col-md-5">
        <imports.TextField maxLength={30} underlineStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineFocusStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Value" hintText="Enter Fav value for name" value={this.state.value} onChange={this.changeValue} name="value" /> 
            </div>
            <br />
          <div className="col-md-2" style={{marginTop: 20}}>
          
          {this.props.dataFromStore.size < 1 && (<imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTap}>
                
                {this.props.dataFromStore.size < 1 && this.props.loading &&'Saving'}
                {this.props.dataFromStore.size < 1 && 'Add'}
          </imports.RaisedButton>)}
          {this.props.dataFromStore.size > 0 && (<imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTapUpdate}>
                
                {this.props.dataFromStore.size > 0 && this.props.updtaeFavloading &&'Updating'}
                {this.props.dataFromStore.size > 0 && 'Update'}
          </imports.RaisedButton>)}
          </div>
     </div>
     <div className="row">
  
     <br />
        <imports.Divider style={myTheme.dividerStyle} inset={true}/>
        <br /> 
        </div>
     </div>
    );
  }
}

function mapStateTopropsUserFav(state) {
      const user = loginUtils.getCurrentUser(state)
    let userName = `${user.get("firstName")} ${user.get("lastName")}`;
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    let dob = user.get('dob');
    let loginId = user.get('id')

    let loading = state.getIn(['MyProfile', 'user', 'fav', 'loading'], false)

    let success = state.getIn(['MyProfile', 'user', 'fav', 'success'], '')
    // console.log("success: ", success)
    let error = state.getIn(['MyProfile', 'user', 'fav', 'errors'], '')

    let updateLoading = state.getIn(['MyProfile', 'user', 'updatefav', 'loading'], false)

    let updateSuccess = state.getIn(['MyProfile', 'user', 'updatefav', 'success'], '')
    if(updateSuccess){
      success = state.getIn(['MyProfile', 'user', 'updatefav', 'success'], '');
    }
    // console.log("success: ", success)
    let updateError = state.getIn(['MyProfile', 'user', 'updatefav', 'errors'], '')
    if(updateError){
      error = state.getIn(['MyProfile', 'user', 'updatefav', 'errors'], '')
    }
    let dataFromStore = state.getIn(['MyProfile', 'user', 'getFromStore'], List());
    let userFavData = state.getIn(['MyProfile', 'getUser', 'fav', 'success'], List())
  return {user, userName, dob, loginId, loading, success, error, updateLoading, userFavData};
}

const actionsToPropsUserFav = {
      saveUserFav: actions.saveUserFav,
      getUserFav: actions.getUserFav,
      updateUserFav: actions.updateUserFav,
      push
    }

const MappedAddUserFav = connect(mapStateTopropsUserFav, actionsToPropsUserFav)(AddUserFav);

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

class Chip extends Component {

  constructor(props) {
    super(props);
    this.state={
       
    }
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.editFav = this.editFav.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  static get propTypes() {
      return {
        loading: React.PropTypes.bool,  
        deleteFavChip: React.PropTypes.func,
        getUserFav: React.PropTypes.func,
        saveToStore: React.PropTypes.func
      }
    }
  componentDidMount(){
    // console.log("Test")
  }
  componentWillReceiveProps(nextProps) {
  // console.log("nextProps.success", nextProps.success.length)
  // console.log("nextProps.errors", nextProps.errors.length)

  
  }
  handleRequestDelete(id) {
    this.props.deleteFavChip(id);
    setTimeout(() => {
          this.props.getUserFav(this.props.loginId);
      }, 1000);
  }

  handleClick() {
    
  }
  editFav(id, name, value, userId) {
    this.props.saveToStore({id:id, name:name, value:value, userId: userId});
    // console.log("Id: ", id)
    // console.log("Name: ", name)
    // console.log("Value: ", value)
  }
  render() {
    const {id, name, value, userId, createdAt, updatedAt} = this.props;
    const favName = toTitleCase(this.props.name)
      // console.log("value: ", this.props.value)
    return (
     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
        <label style={{fontWeight: 'normal', marginTop: 5}}>{favName}: </label>
        </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <imports.Chip key={this.props.userId} id={this.props.id} onRequestDelete={() => this.handleRequestDelete(this.props.id)}
            onClick={this.handleClick} labelColor={config.actualWhite}>
            
            {this.props.value}
          </imports.Chip>
          </div>
          
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2" style={{marginTop:-10}}>
          <imports.IconButton tooltip="Edit"><imports.Edit onClick={() => this.editFav(this.props.id, this.props.name, this.props.value, this.props.userId)}/></imports.IconButton>
          </div>
     </div>
    );
  }
}



function mapStateTopropsChip(state) {
    const user = loginUtils.getCurrentUser(state)
    let userName = `${user.get("firstName")} ${user.get("lastName")}`;
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    let dob = user.get('dob');
    let loginId = user.get('id')
  return {userName, dob, loginId};
}

const actionsToPropsChip = {
      deleteFavChip  : actions.deleteFavChip,
      getUserFav: actions.getUserFav,
      saveToStore: actions.saveToStore,
      push
    }

const MappedChip = connect(mapStateTopropsChip, actionsToPropsChip)(Chip);

class ProfileView extends Component {

  constructor(props) {
    super(props);
    this.state={
        enableAddFav: false,
        remove: false,
        openChipSuccess: false,
        openChipError: false,
        showUploadCoverModal: false
    }
  }
    static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,  
        getUserFav: React.PropTypes.func
      }
    }
  componentDidMount(){
    this.props.getUserFav(this.props.loginId);
    this.props.getProfileImage(this.props.loginId);
    this.props.getCoverPhoto(this.props.loginId);
  }

    componentWillReceiveProps(nextProps) {
      if(this.props.profileImageUrlFail !== nextProps.profileImageUrlFail || this.props.profileImageUrlSuccess!==nextProps.profileImageUrlSuccess){
        this.setState({showUploadModal:false})
      }
      if(nextProps.success || nextProps.error){
         if(nextProps.success.length > 0 || nextProps.error.length > 0){
            this.setState({
              enableAddFav: false,
              remove: false
            })
          }
      }
      if(nextProps.chipDeleteSuccess.length > 0){
        this.setState({
          openChipSuccess: true
        })
      }
       if(nextProps.chipDeleteError.length > 0){
        this.setState({
          openChipError: true
        })
      }

        if(nextProps.dataFromStore.size > 0){
            this.setState({
                enableAddFav: true,
                remove: true
            })
      }
    }

  addFav = (evt) => {
    this.setState({
        enableAddFav: true,
        remove: true
      });
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

  renderAddUserFav(){
    <MappedAddUserFav />
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
handleImageUploadModal = () => {
  this.setState({
    showUploadModal: false,
    showUploadCoverModal: false
  });
}
 showImageUploadModal = () => {
    return(
        <Modal title={'Upload Profile Pic'} handleHideModal={this.handleImageUploadModal} 
          modelSize={{width:'70%'}} modelBodySize={{maxHeight: 300}}> 
            <ProfileImage />
        </Modal>
    )
  }

    showUploadCoverModal = () => {
        return(
            <Modal title={'Upload Cover Photo'} handleHideModal={this.handleImageUploadModal} 
              modelSize={{width:'70%'}} modelBodySize={{maxHeight: 300}}>
                <CoverPhoto />
            </Modal>
        )
    }

  uploadImage = () =>{
    this.setState({showUploadModal:true})
  }

  uploadCoverPhoto = () =>{
    this.setState({showUploadCoverModal:true})
  }
  render() {
    const {userFavData,  chipDeleteloading, chipDeleteSuccess, chipDeleteError} = this.props;
    let rows = [];
    let profilePic = "";
    if(this.props.profileImage && this.props.profileImage.length>0){
      profilePic = `data:image/${this.props.profileImage[0].fileType};base64,`;
      profilePic += new Buffer(this.props.profileImage[0].fileData.data).toString('base64');
    }else{
      profilePic='';
    }

    let coverPhoto = "";
    if(this.props.coverPhoto && this.props.coverPhoto.length>0){
      coverPhoto = `data:image/${this.props.coverPhoto[0].fileType};base64,`;
      coverPhoto += new Buffer(this.props.coverPhoto[0].fileData.data).toString('base64');
    }else{
      coverPhoto='';
    }
    if(this.props.userFavData){
      this.props.userFavData.map( (data, i) => {
        // console.log("Data.name: ", data.get('name'))
        rows.push(<div key={i}><MappedChip key={data.get('_id')} id={data.get('_id')} name={data.get('name')} value={data.get('value')} userId={data.get('userId')} createdAt={data.get('createdAt')} updatedAt={data.get('updatedAt')} />
          </div>)
        rows.push(<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><imports.Divider/></div>)
      })
    }
    return (
     <div>
        {this.state.showUploadModal ? this.showImageUploadModal() : null}
        {this.state.showUploadCoverModal ? this.showUploadCoverModal() : null}
         {this.props.chipDeleteSuccess ? <imports.Snackbar
            open={this.state.openChipSuccess}
            message={this.props.chipDeleteSuccess}
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyle}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          /> : ''}
          {this.props.chipDeleteError ? <imports.Snackbar
            open={this.state.openChipError}
            message={this.props.chipDeleteError}
            autoHideDuration={4000}
            bodyStyle={myTheme.bodyStyle}
            action="Close"
            onRequestClose={this.handleRequestClose}
            onActionTouchTap={this.handleRequestClose}
            style={myTheme.snackbarfromTop}
          /> : ''}
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

          <div className="profile clearfix">                            
                      <div className="slider">
                        <div id="carousel-example-generic" className="carousel slide" data-ride="carousel" data-interval="500">
                          <div className="carousel-inner" role="listbox">
                            <div className="item active">

                              {coverPhoto ? <img src={coverPhoto} width="100%" height="400px"/> :
                              <img src="" alt="This user cover photo is not set" width="100%" height="400px"/>}
                            

                            </div>

                            

                              
                            <div className="col-sm-12 profile-actions text-right">
                              <imports.IconButton tooltip="Edit Cover Photo" iconStyle={{ color: '#fff'}} onClick={this.uploadCoverPhoto}>
                                <imports.Edit/>
                              </imports.IconButton>
                            </div>
                          </div>
                          <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                            
                          </a>
                          <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                            
                          </a>
                          </div>
                          </div> 
                          <div className="user clearfix">
                            <div className="avatar">
                                {profilePic ? <Avatar className="img-thumbnail img-profile" src={profilePic} color='#ffbc03' fgColor='#fff' style={{borderRadius: 'none', width: 'none', height: 'none', fontWeight: 'bold'}} size={110} /> : 
                                <Avatar size="110" />
                                }
                                {this.props.profileLoading ? this.renderLoading(): null}
                                <div className="edit">
                                      <imports.IconButton tooltip="Edit Profile pic" iconStyle={{ color: '#fff'}} onClick={this.uploadImage}>
                                                <imports.Edit/>
                                      </imports.IconButton>
                                    </div>
                            </div> 

                            </div>

                          </div>











            
                <div className="card">
                    <imports.Card style={myTheme.cardStyle}>
                            <imports.CardHeader
                              title="Add your favourites"
                              style={myTheme.cardHeaderStyle}
                              subtitleColor={myTheme.color}
                              titleColor={myTheme.color}
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
                          {this.state.enableAddFav ? <MappedAddUserFav dataFromStore={this.props.dataFromStore}/>: null }
                          {this.props.updateLoading ? this.renderLoading(): null}
                          {this.props.chipDeleteloading ? this.renderLoading(): null}
                          {this.props.userFavloading ? this.renderLoading(): null}
                          {rows.length > 0 && (<div style={{minHeight: 50, maxHeight: 250, overflowY: 'auto'}}>
                            {rows}
                          </div>)}
                          {!this.props.userFavloading && rows.length ==0 && (<h2>No favourites found. Please add</h2>)}
                        </imports.CardText>
                      </imports.Card>       
                </div> 
                <div className="card">
                   <AboutMeComponent />  
                </div> 
                <div className="card">
                   <AskPreferencesComponent />  
                </div> 
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

    let userFavloading = state.getIn(['MyProfile', 'getUser', 'fav', 'loading'], false)

    let userFavData = state.getIn(['MyProfile', 'getUser', 'fav', 'success'], List())
    // userFavData = userFavData.toJS();
    // console.log("userFavData......: ", JSON.stringify(userFavData, undefined, 2))
    let userFavError = state.getIn(['MyProfile', 'getUser', 'fav', 'errors'], '')

    let chipDeleteloading = state.getIn(['MyProfile', 'user', 'deleteFav', 'loading'], false)

    let chipDeleteSuccess = state.getIn(['MyProfile', 'user', 'deleteFav', 'success'], '')
    // console.log("success: ", success)
    let chipDeleteError = state.getIn(['MyProfile', 'user', 'deleteFav', 'errors'], '')
    let dataFromStore = state.getIn(['MyProfile', 'user', 'getFromStore'], List());
    let updateLoading = state.getIn(['MyProfile', 'user', 'updatefav', 'loading'], false)
    // let dataFromStore = state.getIn(['MyProfile', 'user', 'getFromStore'], List());

    let profileImageUrl = state.getIn(['MyProfile', 'user', 'profileUpload', 'profieImageURL'], '')
    let profileImageUrlSuccess = state.getIn(['MyProfile', 'user', 'profileUpload', 'success'])
    let profileImageUrlFail = state.getIn(['MyProfile', 'user', 'profileUpload', 'errors'])
    let profileLoading = state.getIn(['MyProfile', 'profileImage', 'loading'], false);
    let profileImage = state.getIn(['MyProfile', 'profileImage', 'success'], List());
    profileImage = profileImage.toJS();
    let profileImageError = state.getIn(['MyProfile', 'profileImage', 'errors'], '');

    let coverPhotoLoading = state.getIn(['MyProfile', 'getCoverPhoto', 'loading'], false);
    let coverPhoto = state.getIn(['MyProfile', 'getCoverPhoto', 'success'], List());
    coverPhoto = coverPhoto.toJS();
    let coverPhotoError = state.getIn(['MyProfile', 'getCoverPhoto', 'errors'], '');

  return {coverPhotoLoading, coverPhoto, coverPhotoError, userName, updateLoading, dob, loginId, userFavloading, userFavData, userFavError, chipDeleteloading, chipDeleteSuccess,
   chipDeleteError, dataFromStore,profileImageUrl,profileImageUrlSuccess,profileImageUrlFail, profileLoading, profileImage, profileImageError};
}
const actionsToProps = {
      getUserFav: actions.getUserFav,
      getProfileImage: actions.getProfileImage,
      getCoverPhoto: actions.getCoverPhoto,
      push
}
export default connect(mapStateToProps, actionsToProps)(ProfileView);
