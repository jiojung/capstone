import "./header.scss"
import React, { Component } from 'react'
import logo from '../../assets/logo/logo_transparent.png';

class Header extends Component {
    render() {
        return (
            <nav className="nav">
                <img src={logo} alt="steamatch logo" className="nav__logo"/>
                <ul className="nav__list">
                    <li>Match</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        )
    }
}

export default Header
