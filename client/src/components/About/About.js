import React, { Component } from 'react'
import './about.scss';
import {Element} from 'react-scroll';
import '../../../node_modules/aos/dist/aos.css';
import AOS from 'aos';
import axios from 'axios';
const API_URL = 'http://localhost:4000';
AOS.init({
    duration: 1200
   });


class About extends Component {
    constructor(props) { 
        super(props);
     this.state = {
        user1:{},
        user2:{},
        user3:{},
        user4:{},
        user5:{}
    }
}
    componentDidMount(){
        axios.get(`${API_URL}/userinfo`)
        .then((response) =>
        this.setState({
            user1: response.data[0],
            user2: response.data[1],
            user3: response.data[2],
            user4: response.data[3],
            user5: response.data[4]
        }),
        )
        .catch(error  => {
            console.log(error)
        })
    }
    render() {
        return (
            <Element>
            <div className="about" id="about" >
                <div className="about__purpose" data-aos="fade-right">
                    <h2>The Purpose</h2>
                    <p>During this pandemic people are getting less social interaction than ever before. With our website we hope you can find and have a long lasting friendship</p>
                </div>
                <div className="about__users" data-aos="fade-right">
                    <h2>Our users</h2>
                    <div className="about__user">
                        <img src={this.state.user2.avatarfull} alt="user2"/>
                        <img src={this.state.user3.avatarfull} alt="user3"/>
                        <img src={this.state.user4.avatarfull} alt="user4"/>
                        <img src={this.state.user5.avatarfull} alt="user5"/>
                    </div>
                </div>
                <div className="about__team" id="team" data-aos="fade-right">
                    <h2>Our Team</h2>
                    <p>Our team consists of Jio Jung. He hopes you can enjoy this app for what it is supposed to be.</p>
                </div>
                <div className="about__how" id="how" data-aos="fade-right">
                    <h2>How it works</h2>
                    <p>We take your data and put it run it through our program to match you with a random person that already exists in our database. Give it a try!</p>
                </div>
            </div>
            </Element>
        )
    }
}

export default About
