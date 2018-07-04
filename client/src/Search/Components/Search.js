import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AutoComplete from 'material-ui/AutoComplete';
import myTheme from '../../common/theme';
import * as actions from '../actions';
import * as loginUtils from '../../Login/utils';
import {Map, List, fromJS} from 'immutable';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import MenuItem from 'material-ui/MenuItem';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue : '',
      assignedValue: ''
    };
  }

  static get propTypes() {
    return {
      loginId:React.PropTypes.string,
      loading: React.PropTypes.bool,
      fetchUsers : React.PropTypes.func
    }
  }
  componentDidMount(){
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("Data: ", JSON.stringify(nextProps));
    // var arr = [];
    // nextProps.users.forEach(function(key) {
    //   let fullName = key.firstName +" "+key.lastName;
    //     console.log("fullName: ", fullName)
      
    //   arr.push(fullName);
    // });
    // this.setState({
    //   dataSource: arr
    // });
  }

  onUpdateInput = (inputValue) => {
    const self = this;
    this.setState({
      inputValue: inputValue
    }, function() {
      // self.performSearch();
    });
  }
handleNewRequest = (i, value) => {
  console.log("test: ", i, value)
  this.setState({
    assignedValue: i
  })

}
handleUpdateInput = (searchText, dataSource, params) => {
  // console.log("SearchText: ", searchText)
  // console.log("dataSource: ", dataSource)
  // console.log("Params: ", params)
  this.setState({
    searchText:searchText,
    assignedValue: searchText
  })
}
  render() {
    const menuProps = {
      desktop: true,
      disableAutoFocus: false
    };
    var dataSource = [];
    // console.log("User Data: ", JSON.stringify(this.props.usersData))
    if(this.props.usersData.size>0){
       this.props.usersData.forEach((data, i) => {
        // console.log("Data: ", data)
      let fullName = data.get('firstName') +" "+data.get('lastName');
        // console.log("fullName: ", fullName)
        // console.log("ID: ", data.get('_id'))
      if(this.props.loginId != data.get('_id')){
        let path = `${data.get('_id')}/profile`;
        dataSource.push({
          text: fullName,
          value: (
            <MenuItem
              containerElement={<Link to={path} target="_blank"/>}
              primaryText={fullName}
              leftIcon={<img style={{borderRadius:'50%'}} src="https://scontent.fmaa2-2.fna.fbcdn.net/v/t1.0-1/c0.0.240.240/p240x240/734639_408519615899263_348278322_n.jpg?_nc_cat=0&oh=9a3278bf7105809497af80faeff37f7d&oe=5BA9D05A" />}
              maxHeight={100}
              onMouseEnter={(e) => e.target.style.color = myTheme.black}
              onMouseLeave={(e) => e.target.style.color =  myTheme.black}
              style={{color:  myTheme.black, borderBottom: '1px solid #3333'}}
              innerDivStyle={{}}

                      />
          ),
          id: data.get('_id'),
          email: data.get('email')
        });
      }
    });
    }
   
    // this.props.fetchUsers((result) =>{
    //   console.log("result: ", result)
    // });
    return (
      <div>
        <AutoComplete
          floatingLabelText="Search people"
          hintText="Search with name"
          dataSource = {dataSource}
          style={{marginTop: '-20px'}}
          maxSearchResults={10}
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          animated={true}
          onNewRequest= {this.handleNewRequest}
          onUpdateInput={this.handleUpdateInput}
          filter={AutoComplete.fuzzyFilter}        
          inputStyle={myTheme.inputSearchStyleText} underlineStyle={myTheme.underlineSearchStyle} underlineFocusStyle={myTheme.underlineSearchStyle} hintStyle={myTheme.hintSearchStyle} floatingLabelStyle={myTheme.floatingLabelSearchStyle}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
   const user = loginUtils.getCurrentUser(state)
    let loginId;
    if(user.size > 0){
      loginId = user.get('id');
    }
    let usersLoading = state.getIn(['Search', 'users', 'loading'], false);
    let usersData = state.getIn(['Search', 'users', 'all'], List())
    let usersError = state.getIn(['Search', 'users', 'error'], List())
  return {
    loginId, usersData, usersLoading, usersError
  };
}

const actionToProps = {
  fetchUsers : actions.fetchUsers
}
export default connect(mapStateToProps, actionToProps)(Search);
