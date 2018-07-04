import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {white} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import myTheme from '../../common/theme';

class FooterTemplate extends Component {
   constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  renderLinks() {
    
  }
  render() {
    const d = new Date();
    const year = d.getFullYear();
    return (
      <div>{!this.props.authenticated && ( <footer id="footer" className="nb-footer">
       
<div className="container">
<div className="row">
<div className="col-md-3 col-sm-6 col-xs-5">
<div className="footer-info-single">
  <h2 className="title">Company</h2>
  <ul className="list-unstyled">
    <li><Link to="about" className="red-tooltip" data-toggle="tooltip" data-placement="left" title="About US"><i className="fa fa-angle-double-right"></i> About Us</Link></li>
    <li><Link to="team" className="red-tooltip" data-toggle="tooltip" data-placement="left" title="Team"><i className="fa fa-angle-double-right"></i> Team</Link></li>
    <li><Link to="careers" className="red-tooltip" data-toggle="tooltip" data-placement="left" title="Careers"><i className="fa fa-angle-double-right"></i> Careers</Link></li>
    <li><Link to="contact" className="red-tooltip" data-toggle="tooltip" data-placement="left" title="Contact US"><i className="fa fa-angle-double-right"></i> Contact Us</Link></li>
    <li><Link to="press" className="red-tooltip" data-toggle="tooltip" data-placement="left" title="Press"><i className="fa fa-angle-double-right"></i> Press</Link></li>
    <li><Link to="blog" className="red-tooltip" data-toggle="tooltip" data-placement="left" title="Blog"><i className="fa fa-angle-double-right"></i> Blog</Link></li>
    </ul>
</div>
</div>

<div className="col-md-3 col-sm-6 col-xs-5">
<div className="footer-info-single">
  <h2 className="title">Help Center</h2>
  <ul className="list-unstyled">
<li><Link to="login" className="red-tooltip" data-toggle="tooltip" data-placement="left" title="Home"><i className="fa fa-angle-double-right"></i> Home</Link></li>
    <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> Support</a></li>
    <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> FAQ</a></li>
  </ul>
</div>
</div>



<div className="col-md-3 col-sm-6 col-xs-5">
<div className="footer-info-single">
  <h2 className="title">Policies</h2>
  <ul className="list-unstyled">
   <li><Link to="policy" className="red-tooltip" data-toggle="tooltip" data-placement="left" title="Terms Of Use"><i className="fa fa-angle-double-right"></i> Terms Of Use</Link></li>
   <li><Link to="policy" className="red-tooltip" data-toggle="tooltip" data-placement="left" title="Privacy Policy"><i className="fa fa-angle-double-right"></i> Privacy Policy</Link></li>
  </ul>
</div>
</div>
<div className="col-md-3 col-sm-6 col-xs-6">
<div className="footer-info-single">
  <h2 className="title">Connect</h2>
  <a href="https://www.facebook.com/xxxx" style={{color:myTheme.color}} target="_blank" rel="NoFollow" className="btn btn-social-icon btn-facebook">
    <span className="fa fa-facebook"></span>
  </a> 
  <a href="https://www.twitter.com/xxxxx" style={{color:myTheme.color}} target="_blank" rel="NoFollow" className="btn btn-social-icon btn-twitter">
    <span className="fa fa-twitter"></span>
  </a> 
  <a href="https://www.linkedin.com/xxxxx" style={{color:myTheme.color}} target="_blank" rel="NoFollow" className="btn btn-social-icon btn-linkedin">
    <span className="fa fa-linkedin"></span>
  </a>
  <a href="https://www.instagram.com/xxxxx" style={{color:myTheme.color}} target="_blank" rel="NoFollow" className="btn btn-social-icon btn-instagram">
    <span className="fa fa-instagram"></span>
  </a> 
</div>
</div>
</div>
<section className="copyright">
<div className="container">
<div className="row">
<div className="col-md-12">
    <Divider style={{backgroundColor:myTheme.color}}/>
  </div>
<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
    <p style={{color:myTheme.color}}>Copyright © 2018. Netext Inc.</p>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
    <p style={{color:myTheme.color}}>All rights reserved. | V1.0.0</p>
  </div>
</div>
<div className="col-sm-6"></div>
</div>
</div>
</section>
</div>

</footer>)}</div>
    );
  }
}

function mapStateToProps(state) {

 let authenticated = state.getIn(['Login', 'user', 'authenticate'], false);
  return {
      authenticated
  };
}

export default connect(mapStateToProps, null)(FooterTemplate);
