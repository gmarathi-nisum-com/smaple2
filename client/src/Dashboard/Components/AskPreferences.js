import React, {Component} from 'react';
import myTheme from '../../common/theme';
import imports from '../../common/imports';
import * as myProfileActions from '../../myprofile/actions';
import { connect } from 'react-redux';
import {router, push} from 'react-router-redux';
import {Map, List, fromJS, toJS} from 'immutable';

export class AskPrefList extends Component{

  render(){

    return(
        <div style={{marginRight: 50}}>
          <imports.Chip style={{width: 100, backgroundColor: '#333'}}>
            <imports.Avatar color={myTheme.color} backgroundColor="red" size={32}>{this.props.prefName}</imports.Avatar>
              {this.props.pref}
            </imports.Chip>
        </div>
    )
  }
}

class AskPreferences extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  static get propTypes() {
      return {
        loginId:React.PropTypes.string,
        loading: React.PropTypes.bool,  
        getAskPreferences: React.PropTypes.func
      }
    }

  componentWillMount(){
    this.props.getAskPreferences(this.props.searchedUserId)
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
    const {askPreferencesloading, askPreferencesData, askPreferencesError} = this.props;
    let rows = [];
    let text = "I want to hear about my ";
    if(askPreferencesData){
      this.props.askPreferencesData.map( (data, i) => {
      if(data.get('positive') != ""){
        if(data.get('positive') == 'yes'){
          text += 'Positive '
        }
         rows.push(
          <AskPrefList key={1} prefName="P" pref={data.get('positive')} />
        )
      }
      if(data.get('negative') != ""){
        if(data.get('negative') == 'yes'){
          text += 'Negative '
        }
         rows.push(
          <AskPrefList key={2} prefName="N" pref={data.get('negative')} />
        )
      }
      if(data.get('advice') != ""){
        if(data.get('advice') == 'yes'){
          text += 'and your Advice'
        }
         rows.push(
          <AskPrefList key={3} prefName="A" pref={data.get('advice')} />
        )
      }

      if(data.get('positive') == "no" && data.get('negative') == "no" && data.get('advice') == "no"){
        text = "";
        text = "Thanks! I am not intersted to hear anything about me";
      }
    });
    }

    return(
      <div style={{position: 'relative'}}>
          <imports.Card style={myTheme.cardStyle}>
                  <imports.CardHeader
                    title="Ask preferences"
                    style={myTheme.cardHeaderStyle}
                    titleStyle={myTheme.contentStyle}
                  >
                  </imports.CardHeader>
              <imports.Divider style={myTheme.dividerStyle} inset={true}/>
              <imports.CardText style={{position: 'relative'}}>
                {this.props.askPreferencesloading ? this.renderLoading() : null}

                {rows.length > 0 && (
                  <div>
                    <div className="row" style={{textAlign: 'center'}}>
                      <h4>{text}</h4>
                    </div>
                    <div className="row" style={{display:'flex'}}>
                      {rows}
                    </div>
                  </div>

                )}
                {!this.props.askPreferencesloading && rows.length ==0 && (<h3>{this.props.userName} ask preferences are not set</h3>)}

              </imports.CardText>
            </imports.Card> 
      </div>
    )
  }
}

const actionsToProps = {
  getAskPreferences:myProfileActions.getAskPreferences,
  push
}
function mapStateToprops(state){
  let askPreferencesloading = state.getIn(['MyProfile', 'askPreferences', 'loading'], false)
  console.log("askPreferencesloading: ", askPreferencesloading)
  let askPreferencesData = state.getIn(['MyProfile', 'askPreferences', 'success'], List())
  let askPreferencesError = state.getIn(['MyProfile', 'askPreferences', 'errors'], '')
  return {askPreferencesloading, askPreferencesData, askPreferencesError};
}

export default connect(mapStateToprops, actionsToProps)(AskPreferences);