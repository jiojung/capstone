import "./header.scss"
import React, { Component } from 'react'
import logo from '../../assets/logo/logo_transparent.png';
import video from '../../assets/video/video.mp4';
import Footer from '../Footer/Footer';
import {Link} from 'react-router-dom';
import Scroll from 'react-scroll';
import { StickyContainer, Sticky } from "react-sticky";
const ScrollLink = Scroll.Link;

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            width2: 250
        }
    }
    onClick = e => {
        e.preventDefault()
        this.state.width === 0
         ? this.setState({
         width: 250
         })
         : 
        this.setState({
        width: 0
        })
        }
    
    render() {
        console.log("this is width", this.state.width)

        return (
            <div className="header" id="home">
                <div className="header__container">
                <video className='header__video' autoPlay loop muted>
                    <source src={video} type='video/mp4' />
                </video>
                <div className="header__all">
                    <div className="header__nav">
                        <button className="header__button" onClick={this.onClick}>
                            <nav className="nav">
                                <div className="about"></div>
                                <div className="team"></div>
                                <div className="match"></div>
                            </nav>
                            <div className="realnav" 
                            style={{width:this.state.width}}>
                                <div onClick={this.onClick}></div>
                                <ScrollLink to="home" spy={true} smooth={true} duration={500}>Home</ScrollLink>                     <ScrollLink to="about" spy={true} smooth={true} duration={500}>About</ScrollLink>
                                <ScrollLink to="about" spy={true} smooth={true} duration={500}>Team</ScrollLink>
                                <ScrollLink to="footer" spy={true} smooth={true} duration={500}>Contact</ScrollLink>

                            </div>
                        </button>
                        <img src={logo} alt="steamatch logo" className="nav__logo"/>
                    </div>
                    <div className="header__words">
                        <h1>Welcome to Steamatch.</h1>
                        <p>Where friendship is found</p>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Header
