import React, {Component} from 'react';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as myProfileActions from '../../myprofile/actions';
import { connect } from 'react-redux';
import {router, push} from 'react-router-redux';
import {Map, List, fromJS, toJS} from 'immutable';
import * as actions from '../actions';

class ComposePost extends Component {
	constructor(props){
		super(props);
		this.state = {
			post: '',
			showTextfield: false
		}
	}

	static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,  
        savePost: React.PropTypes.func
      }
    }

	componentWillMount(){

	}

	componentDidMount(){

	}

	componentWillReceiveProps(nextProps){

	}
	showTextfield = () => {
		this.setState({
			showTextfield: true,
			postError:'',
			post: ''
		})
	}
	hideTextfield = () => {
		this.setState({
			showTextfield: false,
			postError:'',
			post: ''
		})
	}
	changePost = (evt) => {
		this.setState({
			post: evt.target.value
		})
	}

	handleTouchTap = () => {
		if(this.state.post == '' || this.state.post == null){
			this.setState({
				postError: 'This field is required'
			})
		}else{
			this.setState({
				postError: ''
			})
		}
	}
	render(){
	
		return(
			<div>
		    	<imports.Card style={myTheme.cardStyle}>
	                <imports.CardHeader
	                  title="Compose Post"
	                  style={myTheme.cardHeaderStyle}
	                  titleStyle={myTheme.contentStyle}
	                >
	                {!this.state.showTextfield && <imports.IconButton onClick={this.showTextfield} style={{float: 'left', height: 'unset', marginTop:9}} tooltip="New Post" iconStyle={{marginLeft:-10, marginTop: -25}}>
                        <imports.ContentAdd color="#fff"/>
                    </imports.IconButton>
                	}
                    {this.state.showTextfield && (<imports.IconButton onClick={this.hideTextfield} style={{float: 'right', height: 'unset', marginTop:9}} tooltip="Collapse" iconStyle={{marginLeft:-10, marginTop: -25}}>
                        <imports.Remove color="#fff"/>
                    </imports.IconButton>)}
                    
	                </imports.CardHeader>
	            <imports.Divider style={myTheme.dividerStyle} inset={true}/>
	            <imports.CardText>
	              {this.state.showTextfield && (<div style={{marginTop:-10}}>
	              	<imports.TextField errorText={this.state.postError} errorStyle={myTheme.errorStyle} fullWidth={true} multiLine={true} inputStyle={myTheme.inputStyleText} underlineFocusStyle={myTheme.underlineStyle} hintStyle={myTheme.hintStyle} floatingLabelStyle={myTheme.floatingLabelStyle} floatingLabelText="New Post" hintText="Enter something here" value={this.state.post} onChange={this.changePost} name="post" type="text" /> 
	              	<br />
	              	<br />
	              	<imports.RaisedButton style={myTheme.buttonSimpleStyle} buttonStyle={myTheme.buttonStyle} type="submit" onClick={this.handleTouchTap}>
                    Post
          			</imports.RaisedButton>
	              	</div>)}
	            </imports.CardText>
	          </imports.Card> 
			</div>
		)
	}
}

const actionsToProps = {
  savePost: actions.savePost,
  push
}
function mapStateToprops(state){
	
  	return {};
}

export default connect(mapStateToprops, actionsToProps)(ComposePost);