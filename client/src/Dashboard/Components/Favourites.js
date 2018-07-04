import React, {Component} from 'react';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as myProfileActions from '../../myprofile/actions';
import { connect } from 'react-redux';
import {router, push} from 'react-router-redux';
import {Map, List, fromJS, toJS} from 'immutable';
import {indigo500} from 'material-ui/styles/colors';
import config from '../../config'
class Chip extends Component {
  constructor(props) {
    super(props);
    this.state={
       
    }
  }

  render() {
    const {id, name, value, userId, createdAt, updatedAt} = this.props;
    return (
     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <imports.ListItem
	        leftIcon={<imports.Favorite />}
	        primaryText={this.props.name}
	        secondaryText={this.props.value}
	        key={this.props.userId}
	        id={this.props.id}
	        style={{height:60, marginTop:-10}}
	        hoverColor="#fff"
	      />
	      <imports.Divider key={this.props.id} />
     </div>
    );
  }
}

const MappedChip = connect(null, null)(Chip);


class Favourites extends Component {
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
		//console.log("searchedUserId", this.props.searchedUserId)
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
	      rows.push(<MappedChip key={data.get('_id')} id={data.get('_id')} name={data.get('name')} value={data.get('value')} userId={data.get('userId')} createdAt={data.get('createdAt')} updatedAt={data.get('updatedAt')} />)
	    })
		return(
			<div>
		    	<imports.Card style={myTheme.cardStyle}>
	                <imports.CardHeader
	                  title="Favourites"
	                  style={myTheme.cardHeaderStyle}
	                  titleStyle={myTheme.contentStyle}
	                  avatar={<imports.Favorite color="#fff" style={{marginBottom:-6}}/>}
	                >
	               
	                </imports.CardHeader>
	            <imports.Divider style={myTheme.dividerStyle} inset={true}/>
	            <imports.CardText style={{position: 'relative'}}>
	            {this.props.userFavloading ? this.renderLoading(): null}
	              {rows.length > 0 && (<div style={{display:'flex', minHeight: 50, maxHeight: 250, overflowY: 'auto', width: '100%'}}>
	                <imports.List style={{width: '100%', padding:0}}>
	                {rows}
	                </imports.List>
	              </div>)}
	              {!this.props.userFavloading && rows.length ==0 && (<h2>This user dont have favourites</h2>)}
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

export default connect(mapStateToprops, actionsToProps)(Favourites);