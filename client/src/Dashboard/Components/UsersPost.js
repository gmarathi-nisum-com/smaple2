import React, {Component} from 'react';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as myProfileActions from '../../myprofile/actions';
import { connect } from 'react-redux';
import {router, push} from 'react-router-redux';
import {Map, List, fromJS, toJS} from 'immutable';

class UsersPost extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}

	static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,  
        getUserFav: React.PropTypes.func
      }
    }

	componentWillMount(){
		console.log("searchedUserId", this.props.searchedUserId)
		this.props.getUserFav(this.props.searchedUserId)
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
		this.props.userFavData.map( (data, i) => {
	      //console.log("xxxx", data, undefined, 2);
	      //rows.push(<br />);
	    })
		return(
			<div>
		    	<imports.Card style={myTheme.cardStyle}>
	                <imports.CardHeader
	                  title={this.props.userName}
	                  subtitle="Posted"
	                  style={myTheme.cardHeaderStyle}
	                  titleStyle={myTheme.contentStyle}
	                  subtitleColor={myTheme.color}
	                  avatar="https://scontent.fmaa2-2.fna.fbcdn.net/v/t1.0-1/c0.0.240.240/p240x240/734639_408519615899263_348278322_n.jpg?_nc_cat=0&oh=9a3278bf7105809497af80faeff37f7d&oe=5BA9D05A"
	                >
	                </imports.CardHeader>
	            <imports.Divider style={myTheme.dividerStyle} inset={true}/>
	            <imports.CardText style={{position: 'relative'}}>
	            {this.props.userFavloading ? this.renderLoading(): null}
	              {rows.length > 0 && (<div className="row" style={{display:'flex'}}>
	                {rows}
	              </div>)
	          	}
	              {!this.props.userFavloading && rows.length ==0 && (<span>This user dont have posts</span>)}
	            </imports.CardText>
	          </imports.Card> 
			</div>
		)
	}
}

const actionsToProps = {
      getUserFav: myProfileActions.getUserFav,
      push
    }
function mapStateToprops(state){
	let userFavloading = state.getIn(['MyProfile', 'getUser', 'fav', 'loading'], false)
    let userFavData = state.getIn(['MyProfile', 'getUser', 'fav', 'success'], List())
    console.log("userFavData: ", userFavData)
    // console.log("userFavData......: ", JSON.stringify(userFavData, undefined, 2))
    let userFavError = state.getIn(['MyProfile', 'getUser', 'fav', 'errors'], '')
  	return {userFavData, userFavloading, userFavError};
}

export default connect(mapStateToprops, actionsToProps)(UsersPost);