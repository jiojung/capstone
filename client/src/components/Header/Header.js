import "./header.scss"
import React, { Component } from 'react'
import logo from '../../assets/logo/logo_transparent.png';
import {NavLink} from  'react-router-dom';

class Header extends Component {
    render() {
        return (
            <nav className="nav">
                <img src={logo} alt="steamatch logo" className="nav__logo"/>
                <ul className="nav__list">
                    <li><NavLink to= '/'>Match</NavLink></li>
                    <li><NavLink to= '/'>About</NavLink></li>
                    <li><NavLink to= '/'>Contact</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default Header
