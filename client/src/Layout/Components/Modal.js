import React, {Component} from 'react';
import $ from 'jquery';
import config from '../../config'

export default class Modal extends Component {
  static get propTypes() {
    return {
      handleHideModal: React.PropTypes.func.isRequired,
      title: React.PropTypes.string,
      children: React.PropTypes.node
    }
  }

  componentDidMount() {
    $(this.refs.modal).modal('show')
    $(this.refs.modal).on('hidden.bs.modal', this.props.handleHideModal)
  }

  render() {
    var modelSize = this.props.modelSize;
    var modelBodySize = this.props.modelBodySize;
 
 if(this.props.title==="Upload Image"){
            modelSize = {
        minWidth: "1200px"
      } 
      modelBodySize ={
             minHeight: "300px",
             maxHeight:"800px"
           }

    }

      var modalBodyClass = "modal-body"; 
    
    return (
      <div ref="modal" className="modal fade" role="dialog" id="Common-modalId">
        <div className="modal-dialog" style={modelSize}>
          <div className="modal-content">
            <div className="modal-header" style={{backgroundColor: config.buttonColor, borderBottom:'1px solid black'}}>
              <button type="button" style={{opacity: 'unset', textShadow: 'none'}} className="close" data-dismiss="modal" aria-label="Close"><span style={{color: '#fff'}} aria-hidden="true">&times; </span></button>
              <h4 style={{color: '#fff'}} className="modal-title text-left">{this.props.title}</h4>
            </div>
            <div className={modalBodyClass} style={modelBodySize}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}