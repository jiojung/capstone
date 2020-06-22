import React, { Component } from 'react'
import './about.scss';
import {Element} from 'react-scroll';
import '../../../node_modules/aos/dist/aos.css';
import AOS from 'aos';
AOS.init({
    duration: 1200
   });


class About extends Component {
    render() {
        return (
            <Element name="about">
            <div className="about" id="about" >
                <div className="about__purpose" data-aos="fade-right">
                    <h2>The Purpose</h2>
                    <p>During this pandemic people are getting less social interaction than ever before. With our website we hope you can find and have a long lasting friendship</p>
                </div>
                <div className="about__team" id="team" data-aos="fade-right">
                    <h2>Our Team</h2>
                    <p>Our trio consists of Jio Jung, his computer and his sanity. They hope you can enjoy this app for what it is supposed to be.</p>
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
