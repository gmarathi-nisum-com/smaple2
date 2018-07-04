import config from '../config';
export default {
  fontFamily: config.fontFamily,
    bodyStyle:{
      border: `2px solid ${config.textColor}`,
      height:'55px',
      minWidth: 1385,
      maxWidth: 0,
      background: config.backgroundColor,
      fontFamily: config.fontFamily,
      fontStyle: config.fontStyle,
      fontWeight: config.fontWeight,
      fontSize: config.fontSize,
      borderTopRightRadius: 46,
      borderTopLeftRadius: 46
    },
    errorStyle:{
     display: 'table'
    },
    dividerStyle:{
      background: config.dividerColor, 
      marginTop:0,
      marginBottom:0,
      marginLeft:0,
      marginRight:0,
      height:1,
      width:'100%'
    },
    paperCornerStyle : {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    },
    paperStyle : {
      textAlign: 'center',
      display: 'inline-block',
      fontFamily: config.fontFamily,
      fontStyle: config.fontStyle,
      fontWeight: config.fontWeight,
      fontSize: config.fontSize,
    },
    cardHeaderStyle:{
      backgroundColor: config.tabBackgroundColor,
      color: config.buttonTextColor,
      padding: 10
    },
    cardHeaderStylePref:{
      background: config.tabBackgroundColor,
      color: config.buttonTextColor,
      height: 30,
      padding: 0
    },
    cardStyle:{
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      webkitBoxShadow: '0 0 10px #3333',
      boxShadow: '0 0 10px #3333'
    },
    contentStyle:{
      color: config.buttonTextColor
    },
    floatingLabelStyle: {
      color: config.textColor,
      fontFamily: config.fontFamily,
      fontStyle: config.fontStyle,
      fontWeight: config.fontWeight,
      fontSize: config.fontSize
    },
    floatingLabelSearchStyle: {
      color: config.buttonTextColor,
      fontFamily: config.fontFamily,
      fontStyle: config.fontStyle,
      fontWeight: config.fontWeight,
      fontSize: config.fontSize
    },
    cardTitle: {
      color: config.textColor,
      fontFamily: config.fontFamily,
      fontStyle: config.fontStyle,
      fontWeight: config.fontWeight,
      fontSize: config.fontSize
    },
    cardText: {
      color: config.textColor,
      fontFamily: config.fontFamily,
      fontStyle: config.fontStyle,
      fontWeight: config.fontWeight,
      fontSize: config.fontSize
    },
    hintStyle: {
      color: config.textColor      
    },
    hintSearchStyle: {
      color: config.buttonTextColor      
    },
    snackbarfromTop: {
      color: config.textColor,
      left: '49.9%'
    },
    buttonStyle: {
      background: config.buttonColor,
      labelColor: config.buttonTextColor,
      borderRadius: 5,

    },
    buttonSimpleStyle: {
      background: config.buttonColor, 
      color: config.buttonTextColor,
      borderRadius: 5,
      paddingLeft: 7,
      paddingRight: 7,
      fontFamily: config.fontFamily
    },
    underlineStyle : {
      borderColor: config.textColor
    },
    underlineFocusStyle : {
      borderColor: config.textColor
    },
    inputStyleText: {
      color: config.textColor
    },
    underlineSearchStyle : {
      borderColor: config.buttonTextColor
    },
    inputSearchStyleText: {
      color: config.buttonTextColor
    },
    textAreaStyleText: {
      backgroundColor: config.backgroundColor,
      float: "left",
      height: 300,
      marginBottom: 25,
      marginLeft: 22,
      marginTop: 40,
      width: 65,
      overflowY: "scroll"
    },
    containerStyle :{
      backgroundColor: config.backgroundColor,
      marginTop : 10,
      width: 'none'
    },
    color: config.buttonTextColor,
    backgroundColor: config.backgroundColor,
    labelStyle: {
      color: config.textColor,
      fontWeight: 'normal',
      fontFamily: 'Open Sans,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif',
    },
    inputStyle: {
      backgroundColor: config.backgroundColor,
      color: config.textColor
    },
    iconStyle: {
      fill: config.textColor
    },
    menuStyle: {
      backgroundColor: config.backgroundColor,
      color: config.textColor
    },
    refresh: {
      display: 'inline-block',
      position: 'relative'
  },
  loaderColor: config.textColor,
  containerStyle : {
      width: "50%",
      height: "50%"
  },
  titleStyle : {
      width: "30%",
      height: "50%"
    }
};