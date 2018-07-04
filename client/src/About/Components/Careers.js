import React, { Component } from 'react';
import { connect } from 'react-redux';
import careers from '../../../public/images/careers.jpg'

class Careers extends Component{
	render(){
		return(
			<div style={{marginLeft: '20%', marginRight: '20%', marginTop:40}}>
                <p>Being the first ones on the scene, our journey as a Newpost has been astounding. Same can be yours; topped up to the brim with achievements and learning.</p> 

                <p>Want to create dream products using bleeding edge technology and bring them to life...then Newpost is the place for you!</p>

                <p>At Newpost, we believe that great vision is irrelevant without great people. We love to work with people driven by passion and a thirst to create something futuristic - be it a product, a technological advance, or a unique marketing campaign; </p>

                <p>It’s an open culture here at Newpost, a free world. You’ll get unlimited support to create what you want. Handle big projects, bring them to a closure and get lauded for your achievements. And yes, we keep celebrating both big &amp; small wins.</p> 
                
                <p>Are you everything we just mentioned? If yes, then what are you waiting for? Just send across your resume stating the difference you can make to our revolutionizing story.</p> 
                <p><img src={careers} media-popup="" width="100%"/></p>

                <h2>There are no open positions at this time</h2>
                <p>Please send us your updated resume at career@newpost.com and put the job title as subject in your mail</p>
      
          </div>
		)
	}
}
function mapStateToProps(state) {
    
    return{

      }
}

const actionsToProps = {
     
    }

export default connect(mapStateToProps, actionsToProps)(Careers);