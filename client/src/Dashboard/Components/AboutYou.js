import React, {Component} from 'react';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as myProfileActions from '../../myprofile/actions';
import { connect } from 'react-redux';
import {router, push} from 'react-router-redux';
import {Map, List, fromJS, toJS} from 'immutable';

class AboutYou extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}

	static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,  
        getAboutme: React.PropTypes.func
      }
    }

	componentWillMount(){
		// console.log("searchedUserId", this.props.searchedUserId)
		this.props.getAboutme(this.props.searchedUserId)
	}

	componentDidMount(){

	}

	componentWillReceiveProps(nextProps){

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
	render(){
		let rows = [];
		const {aboutMeloading, aboutMeData, aboutMeError} = this.props;
	    if(aboutMeData){
	      this.props.aboutMeData.map( (data, i) => {
		      rows.push(
		          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		            <span key={i}>{data.get('aboutMe')}</span>
		          </div>
		        )
		    });
	    }
		return(
			<div>
		    	<imports.Card style={myTheme.cardStyle}>
	                <imports.CardHeader
	                  title="About Me"
	                  style={myTheme.cardHeaderStyle}
	                  avatar={<imports.Info color="#fff" style={{marginBottom:-6}}/>}
	                  titleStyle={myTheme.contentStyle}
	                >
	                 
	                </imports.CardHeader>
	            <imports.Divider style={myTheme.dividerStyle} inset={true}/>
	            <imports.CardText style={{position: 'relative'}}>
	            {this.props.aboutMeloading ? this.renderLoading(): null}
	            {rows.length > 0 && (<div className="row" style={{display:'flex'}}>
	                {rows}
	              </div>)}
	              {!this.props.aboutMeloading && rows.length ==0 && (<h3>{this.props.userName} intro is empty</h3>)}
	            </imports.CardText>
	          </imports.Card> 
			</div>
		)
	}
}

const actionsToProps = {
      getAboutme: myProfileActions.getAboutme,
      push
    }
function mapStateToprops(state){
	let aboutMeloading = state.getIn(['MyProfile', 'getUser', 'aboutMe', 'loading'], false)

    let aboutMeData = state.getIn(['MyProfile', 'getUser', 'aboutMe', 'success'], List())
    // console.log("userFavData: ", JSON.stringify(userFavData, undefined, 2))
    let aboutMeError = state.getIn(['MyProfile', 'getUser', 'aboutMe', 'errors'], '')
  	return {aboutMeloading, aboutMeData, aboutMeError};
}

export default connect(mapStateToprops, actionsToProps)(AboutYou);