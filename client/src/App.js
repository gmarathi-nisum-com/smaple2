import React, { Component } from 'react';
import HeaderTemplate from './Layout/Components/Header';
import FooterTemplate from './Layout/Components/Footer';
import imports from './common/imports';
import config from './config';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap-theme.min.css' // optional
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLoading: true
    }
  }
  componentDidMount(){
      // socketClient.emit('new friend request', data);
      this.setState({
        showLoading: false
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
    const muiTheme = imports.getMuiTheme({
      palette:{
        primary1Color:config.textColor,
        primary2Color:config.textColor,
        pickerHeaderColor: config.buttonColor,
        canvasColor: config.backgroundColor,
        alternateTextColor:config.textColor,
        selectColor:config.textColor,
        calendarTextColor: config.textColor,
        color: config.textColor,
        primaryTextColor: config.textColor,
        fontFamily: config.fontFamily 
      },
      datePicker: {
        color: config.textColor,
        textColor: config.buttonTextColor,
        calendarTextColor: config.textColor,
        selectColor: config.textColor,
        selectTextColor: config.buttonTextColor,
        calendarYearBackgroundColor: config.backgroundColor
      },
    menu: {
      backgroundColor: config.backgroundColor,
      containerBackgroundColor: config.backgroundColor
    },
      dropDownMenu: {
        accentColor:  config.textColor
      },
       menuItem: {
        dataHeight: 20,
        height: 8,
        selectedTextColor: config.textColor,
        rightIconDesktopFill: config.textColor
      },
      stepper: {
        iconColor: config.buttonColor,
        hoveredIconColor: config.textColor,
        inactiveIconColor: config.buttonColor,
        textColor: config.textColor,
        disabledTextColor: config.buttonColor,
        connectorLineColor: config.textColor
      },
      chip: {
        backgroundColor: config.buttonColor,
        deleteIconColor: config.buttonTextColor,
        textColor: config.buttonTextColor,
        fontSize: 14,
        fontWeight: config.fontWeight,
        fontFamily: config.fontFamily 
      },
       avatar: {
        color: config.textColor,
        backgroundColor: config.buttonColor
      },
      floatingActionButton: {
        buttonSize: 56,
        miniSize: 40,
        color: config.textColor,
        iconColor: config.buttonColor,
        secondaryColor: config.buttonColor,
        secondaryIconColor: config.buttonColor
      },
      toggle: {
        thumbOnColor: config.buttonColor,
        thumbOffColor: config.buttonColor,
        thumbDisabledColor: config.buttonColor,
        thumbRequiredColor: config.buttonTextColor,
        trackOnColor: config.greyColor,
        trackOffColor: config.greyColor,
        trackDisabledColor: config.backgroundColor,
        labelColor: config.textColor,
        labelDisabledColor: config.textColor,
        trackRequiredColor: config.textColor,
    },
     card: {
      titleColor: config.textColor,
      subtitleColor: config.textColor,
      fontFamily: 'Open Sans","Helvetica Neue",Helvetica,Arial,"Lucida Grande'
    },
     cardMedia: {
      color: config.textColor,
      titleColor: config.buttonTextColor,
      subtitleColor: config.buttonTextColor
    },
    cardText: {
      textColor: config.textColor
    },
     snackbar: {
      textColor: config.textColor,
      actionColor: config.textColor
    },
    flatButton: {
      color: config.buttonColor,
      buttonFilterColor: config.buttonColor,
      disabledTextColor: config.textColor,
      textColor: config.buttonTextColor,
      primaryTextColor: config.buttonTextColor,
      secondaryTextColor: config.buttonColor,
      fontSize: config.fontSize,
      fontWeight: config.fontWeight
    },
     refreshIndicator: {
      strokeColor: config.textColor,
      loadingStrokeColor: config.buttonColor,
    },
    tabs: {
      backgroundColor: config.tabBackgroundColor,
      textColor: config.buttonTextColor,
      selectedTextColor: config.textColor
    }
    });
    return (
      <imports.MuiThemeProvider muiTheme={muiTheme}>
        <div>
        <HeaderTemplate logo="Postme" />
          <div id="demo-settings" className="">
            <a href="#" id="demo-settings-toggler" className="fa fa-dot-circle-o"></a>
          </div>
        <div className="container-fluid bodyfluid">
          {this.state.showLoading ? this.renderLoading(): ''}
          {this.props.children}
        </div>
        <FooterTemplate />
      </div>
      </imports.MuiThemeProvider>
    );
  }
}


export default App;
