import React, { Component } from 'react';
import background1 from '../../../public/images/hd2.jpg';
class Home extends Component {
  render() {
    const style = {
      backgroundColor: '#3333', 
      color: "#00897B"
    }
    let path1 = `url(${background1})`
    // let path2 = `url(${background2})`

    // let path3 = `url(${background3})`
    // let path4 = `url(${background4})`
    // let path5 = `url(${background5})`
    return (
      <div className="container-fluid">  
        <section id="intro">

    <div className="intro-content">
      <h2>Making <span>your ideas</span><br/>happen!</h2>
      <div>
        <a href="#about" className="btn-get-started scrollto">Get Started</a>
        <a href="#portfolio" className="btn-projects scrollto">Our Projects</a>
      </div>
    </div>

    <div id="intro-carousel">
      <div className="item" style={{backgroundImage: path1}}></div>
     
    </div>

  </section>

  
      </div>
    );
  }
}

export default Home;
