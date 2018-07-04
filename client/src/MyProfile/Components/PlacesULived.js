import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as loginUtils from '../../Login/utils';
import * as actions from '../actions';
import {router, push} from 'react-router-redux';
import {Map, List, fromJS, toJS} from 'immutable';

class PlacesULived extends Component {

  constructor(props) {
    super(props);
    this.state={
        enableAddFav: false,
        remove: false,
        openChipSuccess: false,
        openChipError: false
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
  }

    componentWillReceiveProps(nextProps) {
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

      //   if(nextProps.dataFromStore.size > 0){
      //       this.setState({
      //           enableAddFav: true,
      //           remove: true
      //       })
      // }

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
  render() {
    // console.log("Parent component renders")
    const {userFavData,  chipDeleteloading, chipDeleteSuccess, chipDeleteError} = this.props;
    let rows = [];
    // console.log("userFavData.....", userFavData)
    if(this.props.userFavData){
      this.props.userFavData.map( (data, i) => {
        // console.log("Data.name: ", data.get('name'))
        rows.push(<div key={i}><MappedCard key={data.get('_id')} id={data.get('_id')} name={data.get('name')} value={data.get('value')} userId={data.get('userId')} createdAt={data.get('createdAt')} updatedAt={data.get('updatedAt')} />
          </div>)
        rows.push(<imports.Divider style={myTheme.dividerStyle}/>)
        rows.push(<br />);
      })
    }
    return (
          <div>
              
              <imports.Card style={myTheme.cardStyle}>
                      <imports.CardHeader
                        title="Places You've Lived"
                        style={myTheme.cardHeaderStyle}
                        subtitleColor={myTheme.color}
                        titleStyle={myTheme.contentStyle}
                      >
                      
                      {this.state.remove ?  (<imports.IconButton tooltip="Hide" style={{float: 'right'}}  iconStyle={{marginTop: -25, color: myTheme.color}} onClick={this.removeMinus}>
                          <imports.Remove/>
                      </imports.IconButton>):

                     
                      (<imports.IconButton style={{float: 'right'}} tooltip="Add" iconStyle={{marginTop: -25, color: myTheme.color}} onClick={this.addFav}>
                          <imports.ContentAdd/>
                      </imports.IconButton>)}
                      
                      </imports.CardHeader>
                  <imports.Divider />
                  <imports.CardText>
                    {this.state.enableAddFav ? <MappedAddWork dataFromStore={this.props.dataFromStore}/>: null }

                    {rows.length > 0 ? (<div>
                      {rows}
                    </div>): (<h2>No records found. Please add</h2>)}
                  </imports.CardText>
                </imports.Card>       
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
    console.log("dataFromStore: ", dataFromStore)
    // let dataFromStore = state.getIn(['MyProfile', 'user', 'getFromStore'], List());
    // console.log("dataFromStore: ", dataFromStore)
  return {userName, dob, loginId, userFavloading, userFavData, userFavError, chipDeleteloading, chipDeleteSuccess, chipDeleteError, dataFromStore};
}
const actionsToProps = {
      getUserFav: actions.getUserFav,
      push
}
export default connect(mapStateToProps, actionsToProps)(PlacesULived);