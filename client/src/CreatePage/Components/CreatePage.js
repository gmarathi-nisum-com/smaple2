import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {white} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as actions from '../actions';
import {router, push} from 'react-router-redux';
import * as loginUtils from '../../Login/utils';
import {Map, List, fromJS, toJS} from 'immutable';

const TWO_MiB = 1156000;
var pageData = {}
class StepOne extends Component {

  constructor(props) {
    super(props);
    this.state={
       pageTitle: ''
    }
    this.changePageTitle = this.changePageTitle.bind(this);
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
  changePageTitle = (e) => {
    this.setState({
      pageTitle: e.target.value
    })
    pageData.pageTitle = e.target.value;
  };
 
  render() {
    const {} = this.props;
      // console.log("value: ", this.props.value)
    return (
     <div>
        <div className="col-md-10">
          <h3>This is how people identify your page</h3>
          <h4>The title of your page should match the name of your brand, business or organization</h4>
        </div>
        <div className="col-md-5">
            <imports.TextField underlineStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineFocusStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Page Title" hintText="Enter page title" value={this.state.pageTitle} onChange={this.changePageTitle} name="pageTitle" />
        </div>
     </div>
    );
  }
}

function mapStateTopropsStepOne(state) {

  return {};
}

const actionsToPropsStepOne = {

    }

const MappedStepOne = connect(mapStateTopropsStepOne, actionsToPropsStepOne)(StepOne);

class StepTwo extends Component {

  constructor(props) {
    super(props);
    this.state={
       CategoryValue: 0,
       subCategoryId: 0,
       subCategory:[],
       SubCategoryValue: 0
    }
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeSubCategory = this.handleChangeSubCategory.bind(this);
    
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
  // console.log("nextProps.pageCategoriesData", nextProps.pageCategoriesData)
  // console.log("nextProps.errors", nextProps.errors.length)

  
  }
  handleChangeCategory = (event, index, value) => {
    var subRows = []
    this.props.pageCategoriesData.get("categories").map((data, i) => {
        data.get("categories").map((c, i) => {
          subRows.push(<imports.MenuItem key={0} value={0} primaryText="Select a Sub Category" />)
          if(value == c.get("value")){
            c.get("subCategories").map((subC, i) => {
              subRows.push(<imports.MenuItem key={subC.get('_id')} value={subC.get('value')} primaryText={subC.get('name')} name={subC.get('name')} />)
            })
          }
        })
    })

    this.setState({
      CategoryValue: value,
      subCategoryId: value,
      subCategory: subRows,
      SubCategoryValue: 0
    });
    pageData.category = value;
  }
  
  handleChangeSubCategory = (event, index, value) => {
    var subRows = []
    this.setState({
      SubCategoryValue: value
    });
    pageData.subCategory = value;
  }
  render() {
    const {pageCategoriesData} = this.props;
    let rows = [];
   // console.log("nextProps.pageCategoriesData", JSON.stringify(pageCategoriesData.get("categories"), undefined, 2))
    pageCategoriesData.get("categories").map((data, i) => {
        rows.push(<imports.MenuItem key={0} value={0} primaryText="Select A Category" />)
        data.get("categories").map((c, i) => {
            rows.push(<imports.MenuItem key={c.get('_id')} value={c.get('value')} primaryText={c.get('name')} id={c.get('name')} />)
        })
    })

    // let rows = [];
    // const category = [
    //     {name: "Books & Magazines", value: 1},
    //     {name: "Brands & Products", value: 2},
    //     {name: "Companies & Oraganizations", value: 3},
    //     {name: "Event sources", value: 4},
    //     {name: "Films", value: 5},
    //     {name: "Local businesses", value: 6},
    //     {name: "Music", value: 7},
    //     {name: "Other", value: 8},
    //     {name: "People", value: 9},
    //     {name: "Sports", value: 10},
    //     {name: "Television", value: 11},
    //     {name: "Websites & Blogs", value: 12}
    //   ];
    //   // console.log("value: ", this.props.value)
    //   category.map((data, i) => {
    //     rows.push(<imports.MenuItem value={data.value} primaryText={data.name} />)
    //   });

    return (
     <div>
        <div className="col-md-10">
          <h4>Add one category to help people understand your page. Choose the closest one - you can update it later.</h4>
        </div>
        <div className="col-md-10">
          <div className="col-md-5">
              <imports.SelectField floatingLabelText="Category" hintText="Select a category" autoWidth={true} maxHeight={300} value={this.state.CategoryValue} onChange={this.handleChangeCategory} underlineStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineFocusStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} >
                  {rows}
              </imports.SelectField>
              
          </div>
          {this.state.subCategoryId > 0 && (<div className="col-md-3">
              <imports.SelectField floatingLabelText="Sub Category" hintText="Select a sub category"  autoWidth={true} maxHeight={300} value={this.state.SubCategoryValue} onChange={this.handleChangeSubCategory} underlineStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineFocusStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} >
                  {this.state.subCategory}
              </imports.SelectField>
              
          </div>)}
          </div>
        <div className="col-md-8">
          <h5>Popular page categories: Professional service, Local business, Blog and Musician</h5>
        </div>
     </div>
    );
  }
}

function mapStateTopropsStepTwo(state) {

  return {};
}

const actionsToPropsStepTwo = {

    }

const MappedStepTwo = connect(mapStateTopropsStepTwo, actionsToPropsStepTwo)(StepTwo);

class StepThree extends Component {

  constructor(props) {
    super(props);
    this.state={
       website: 'https://'
    }
    this.changeWebsite = this.changeWebsite.bind(this);
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
  changeWebsite = (e) => {
    this.setState({
      website: e.target.value
    })
    pageData.website = e.target.value;
  };
 
  render() {
    const {} = this.props;
      // console.log("value: ", this.props.value)
    return (
     <div>
        <div className="col-md-10">
          <h4>If you have a website, add it here so people can get to it from your page</h4>
        </div>
        <div className="col-md-5">
            <imports.TextField underlineStyle={myTheme.underlineStyle} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineFocusStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="Website" hintText="Type with prefix https://" value={this.state.website} onChange={this.changeWebsite} name="website" />
        
        </div>
        <div className="col-md-8">
          <h5>You can skip this step if you don't have a website</h5>
        </div>
     </div>
    );
  }
}

function mapStateTopropsStepThree(state) {

  return {};
}

const actionsToPropsStepThree = {

    }

const MappedStepThree = connect(mapStateTopropsStepThree, actionsToPropsStepThree)(StepThree);


class StepFour extends Component {

  constructor(props) {
    super(props);
      this.maxSize = TWO_MiB;
      this.maxWidth = 3000;
      this.maxHeight = 3000;
      this.text = `Drop image here. Max ${this.maxSize} and ${this.maxWidth}px by ${this.maxHeight}px`;

    this.state={
       uploadedFile: [],
       open: false,
       error: ''
    }
    this.onImageDrop = this.onImageDrop.bind(this);
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

 onImageDrop(files) {

    if (files.length === 0) {
      this.setState({
        error: 'No files found!',
        open: true
      })
      return;
    }
    this.setState({
      uploadedFile: files
    });
    files.forEach(file =>{
      if(file['size'] > 0){
        var reader = new window.FileReader();
        reader.onload = (function(){
          var dataURL = reader.result;
          var splited = dataURL.split('base64');
          if(splited.length >1){
            var buf = Buffer(splited[1], 'base64');
            console.log("dataURL buffer: ", buf)
          }
           var droppedProfilePhotoFile = {
            file_name: file['name'],
            file_type: file['type'],
            file_size: file['size'] + '',
            file_data: buf
          }
          pageData.droppedProfilePhotoFile = droppedProfilePhotoFile;
          this.forceUpdate();
        }).bind(this);
        reader.readAsDataURL(file)
      }else{

      }
    })

  }
 
  render() {
    const {} = this.props;
    const dropzoneStyle = {
      width  : "100%",
      height : "150px",
      border : "2px solid #fff",
      borderStyle: 'dashed'
    };
    const dropzoneStyleActive = {
        width  : "100%",
        height : "150px",
        border : "2px solid #fff",
        borderStyle: 'dashed'
    };
      // console.log("value: ", this.props.value)
    return (

     <div>
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
        <div className="col-md-10">
          <h4>Pages with profile and cover photos appear higher in search results</h4>
        </div>
        <div className="col-md-12">
            <imports.Dropzone
                multiple={false}
                accept="image/*"
                style={dropzoneStyle}
                onDrop={this.onImageDrop}>
                <div style={{margin: '4.5% 0% 30% 30%'}}>Drag and drop or click to select a 170x170 file to upload.</div>
              </imports.Dropzone>

                {this.state.uploadedFile.length > 0 ? <div>
                  <h2>Uploaded {this.state.uploadedFile.length} file</h2>
                  <div>{this.state.uploadedFile.map((file) => <img src={file.preview} width={200} height={200}/> )}</div>
                  </div> : null}
        </div>
        <div className="col-md-8">
        <br />
          <h5>A photo or logo works well here</h5>
        </div>
     </div>
    );
  }
}

function mapStateTopropsStepFour(state) {

  return {};
}

const actionsToPropsStepFour = {

    }

const MappedStepFour = connect(mapStateTopropsStepFour, actionsToPropsStepFour)(StepFour);

class StepFive extends Component {

  constructor(props) {
    super(props);
    this.state={
       uploadedFile: [],
       open: false,
       error: ''
    }
    this.onImageDrop = this.onImageDrop.bind(this);
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

  onImageDrop(files) {

    if (files.length === 0) {
      this.setState({
        error: 'No files found!',
        open: true
      })
      return;
    }
    this.setState({
      uploadedFile: files
    });
    files.forEach(file =>{
      if(file['size'] > 0){
        var reader = new window.FileReader();
        reader.onload = (function(){
          var dataURL = reader.result;
          var splited = dataURL.split('base64');
          if(splited.length >1){
            var buf = new Buffer(splited[1], 'base64');
            console.log("dataURL buffer: ", buf)
          }
           var droppedCoverPhotoFile = {
            file_name: file['name'],
            file_type: file['type'],
            file_size: file['size'] + '',
            file_data: buf
          }
          pageData.droppedCoverPhotoFile = droppedCoverPhotoFile;
          console.log("Final object: ", JSON.stringify(buf))
          this.forceUpdate();
        }).bind(this);
        reader.readAsDataURL(file)
      }else{

      }
    })

  }

 
  render() {
    const {} = this.props;
    const dropzoneStyle = {
      width  : "100%",
      height : "150px",
      border : "2px solid #292961",
      borderStyle: 'dashed'
    };
    const dropzoneStyleActive = {
        width  : "100%",
        height : "150px",
        border : "2px solid #3333",
        borderStyle: 'dashed'
    };
      // console.log("value: ", this.props.value)
    return (
     <div>
        <div className="col-md-10">
          <h4>Pages with profile and cover photos appear higher in search results</h4>
        </div>
        <div className="col-md-12">
            <imports.Dropzone
                multiple={false}
                accept="image/*"
                style={dropzoneStyle}
                onDrop={this.onImageDrop}>
                <div style={{margin: '4.5% 0% 30% 30%'}}>Drag and drop or click to select a 170x170 file to upload.</div>
              </imports.Dropzone>

                {this.state.uploadedFile.length > 0 ? <div>
                  <h2>Uploaded {this.state.uploadedFile.length} file</h2>
                  <div>{this.state.uploadedFile.map((file) => <img src={file.preview} width={600} height={300} /> )}</div>
                  </div> : null}
        </div>
        <div className="col-md-8">
          <h5>Choose a larger, high-resolution image for your cover photo</h5>
        </div>
     </div>
    );
  }
}

function mapStateTopropsStepFive(state) {

  return {};
}

const actionsToPropsStepFive = {

    }

const MappedStepFive = connect(mapStateTopropsStepFive, actionsToPropsStepFive)(StepFive);


class CreatePage extends Component {
   constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      page:1
    };
  }
 static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,  
        getPageCatogories: React.PropTypes.func
      }
    }
  componentDidMount(){
    this.props.getPageCatogories();
  }
  renderLinks() {
    
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 4) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

// handleGetStarted = () => {
//   this.setState({page: 2});
// }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <MappedStepOne />;
      case 1:
        return <MappedStepTwo pageCategoriesData={this.props.pageCategoriesData} />;
      case 2:
        return <MappedStepThree />;
       case 3:
        return <MappedStepFour />;
      case 4:
        return <MappedStepFive />;
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
        const {stepIndex} = this.state;
    return (
        <div>
             <div className="module row" style={{display: 'flex'}}>
                <section className="section"> 
                  <div className="col-md-10">
                    <h2><imports.Add/> Create a Page</h2>
                    <h4 style={{marginLeft: 20}}>Give your brand, business or cause a voice on Netext and connect with the people who matter to you.</h4>
                    <h4 style={{marginLeft: 20}}>It's free to set up. Just follow simple steps below to get started.</h4>
                    <imports.Stepper linear={true} activeStep={stepIndex} connector={<imports.Arrow /> }>
                    <imports.Step>
                      <imports.StepButton onClick={() => this.setState({stepIndex: 0})}>
                        Give your Page a title
                      </imports.StepButton>
                    </imports.Step>
                    <imports.Step>
                      <imports.StepButton onClick={() => this.setState({stepIndex: 1})}>
                        Whats this Page about?
                      </imports.StepButton>
                    </imports.Step>
                    <imports.Step>
                      <imports.StepButton onClick={() => this.setState({stepIndex: 2})}>
                        Add your website
                      </imports.StepButton>
                    </imports.Step>
                    <imports.Step>
                      <imports.StepButton onClick={() => this.setState({stepIndex: 3})}>
                        Add a Profile Picture
                      </imports.StepButton>
                    </imports.Step>
                    <imports.Step>
                      <imports.StepButton onClick={() => this.setState({stepIndex: 4})}>
                        Add a cover photo
                      </imports.StepButton>
                    </imports.Step>
                    
                  </imports.Stepper>
                  <div className="row"  style={{marginLeft: 20, minHeight: 200, maxHeight: 600}}>
                    {this.getStepContent(stepIndex)}
                  </div>
                    <div  className="col-md-10" style={{marginLeft: 20}}>
                      {stepIndex > 0 ? <imports.RaisedButton
                        disabled={stepIndex === 0}
                        onClick={this.handlePrev}
                        style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle}
                      >

                       Back
                      </imports.RaisedButton>: ''}
                      <imports.RaisedButton disabled={stepIndex === 7} style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleNext}>
                          {stepIndex === 4 ? 'Finish' : 'Next'}
                      </imports.RaisedButton>
                      
                    </div>
                  </div>
                </section>
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
    let pageCategoriesloading = state.getIn(['CreatePage', 'getPageCategories', 'loading'], false)

    let pageCategoriesData = state.getIn(['CreatePage', 'getPageCategories', 'success'], List())
    // pageCategoriesData = pageCategoriesData.toJS();
    // console.log("pageCategoriesData: ", JSON.stringify(pageCategoriesData, undefined, 2))
    let pageCategoriesError = state.getIn(['CreatePage', 'getPageCategories', 'errors'], '')
  return {
    userName, dob, loginId, pageCategoriesData, pageCategoriesloading, pageCategoriesError
  };
}

const actionsToProps = {
      getPageCatogories: actions.getPageCatogories,
      push
}

export default connect(mapStateToProps, actionsToProps)(CreatePage);



// function resize (file, maxWidth, maxHeight, fn) {
//     var reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function (event) {
//         var dataUrl = event.target.result;
 
//         var image = new Image();
//         image.src = dataUrl;
//         image.onload = function () {
//             var resizedDataUrl = resizeImage(image, maxWidth, maxHeight, 0.7);
//             fn(resizedDataUrl);
//         };
//     };
// }
 
// function resizeImage(image, maxWidth, maxHeight, quality) {
//     var canvas = document.createElement('canvas');
 
//     var width = image.width;
//     var height = image.height;
 
//     if (width > height) {
//         if (width > maxWidth) {
//             height = Math.round(height * maxWidth / width);
//             width = maxWidth;
//         }
//     } else {
//         if (height > max_height) {
//             width = Math.round(width * maxHeight / height);
//             height = maxHeight;
//         }
//     }
 
//     canvas.width = width;
//     canvas.height = height;
 
//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(image, 0, 0, width, height);
//     return canvas.toDataURL("image/jpeg", quality);
// }
