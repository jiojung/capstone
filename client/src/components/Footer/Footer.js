import React, { Component } from 'react';
import './footer.scss';
import twitter from '../../assets/logo/twitter.svg';
import discord from '../../assets/logo/discord-logo.svg';
import github from '../../assets/logo/github.png';

class Footer extends Component {
    render() {
        return (
            <div className="footer" id="footer">
                <h4>Get in touch</h4>
                <div className="footer__main">
                    <div className="footer__logo">
                        <h5>Twitter</h5>
                        <img src={twitter} alt="twitter logo" className="footer__twitter--logo"/>
                    </div>
                    <div className="footer__logo">
                        <h5>Discord</h5>
                        <img src={discord} alt="discord logo" className="footer__discord--logo"/>
                    </div>
                    <div className="footer__logo">
                        <h5><a href={`https://github.com/jiojung`} target="_blank" rel="noopener noreferrer">Github</a></h5>
                        <a href={`https://github.com/jiojung`} target="_blank" rel="noopener noreferrer"><img src={github} alt="github logo" className="footer__github--logo"/></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer
