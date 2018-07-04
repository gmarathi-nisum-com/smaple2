import React, { Component } from 'react';
import { connect } from 'react-redux';

class Team extends Component{
	render(){
		return(
			<div style={{marginLeft:'20%', marginRight: '20%', textAlign: 'center'}}>
        
        <h2>Our amazing team</h2>
        <p>

        	Newpost is defined by our hacker culture - an environment that rewards creative problem solving and rapid decision making. We encourage people to be bold. Our open culture keeps everyone informed and allows people to move around and solve the problems they care about most. We work in small teams and move fast to develop new products, constantly iterating and improving. The phrase “this journey is 1% finished” is posted on our walls, reminding us that we’ve only begun to fulfill our mission to bring the world closer together.

        </p>

        <div className="row text-center">

            

            <div className="col-md-4 mb-4">

                <div>
                    <img style={{border: '4px solid #efefef', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} src="https://scontent.fmaa6-1.fna.fbcdn.net/v/t1.0-9/380568_407266669334804_1294433219_n.jpg?oh=27397772c44dab6fa7d6f76b445e7312&oe=5B0E9A2A" height={200} width={200} className="img-circle" alt="First sample avatar image" />
                </div>
                <h4>
                    <strong>Rajesh Pemmasani</strong>
                </h4>
                <h5>Founder & CEO</h5>

                

            </div>
            <div className="col-md-4 mb-4">

                <div>
                    <img style={{border: '4px solid #efefef', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} src="https://media.licdn.com/dms/image/C5603AQGRF5DWYCPKVw/profile-displayphoto-shrink_800_800/0?e=1525366800&v=alpha&t=2jbDDnJF1pXABXCdpfIkrUQkX_B70anYp5FAVIdLG3w" height={200} width={200} className="img-circle" alt="Third sample avatar image" />
                </div>
                <h4>
                    <strong>Lokesh Pemmasani</strong>
                </h4>
                <h5>Founder & CEO</h5>

                

            </div>
            <div className="col-md-4 mb-4">

                <div>
                    <img style={{border: '4px solid #efefef', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} src="https://media.licdn.com/dms/image/C4E03AQHyPq5tnc6OEA/profile-displayphoto-shrink_200_200/0?e=1525366800&v=alpha&t=8snjSU0sagp-SxQvo9lfAiHtuE9OjmYOlZy7d4WfdBs" height={200} width={200} className="img-circle" alt="First sample avatar image" />
                </div>
                <h4>
                    <strong>Hemadri Dasari</strong>
                </h4>
                <h5>Founder & Director</h5>

                

            </div>
        </div>

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

export default connect(mapStateToProps, actionsToProps)(Team);