import React, {Component} from 'react';

export default class TransparentIndexPage extends Component {
  
  static get propTypes() {
    return {
      children: React.PropTypes.node
    }
  }
  
  render() {
		return React.cloneElement(this.props.children)
	}
}