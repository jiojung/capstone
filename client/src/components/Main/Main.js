import React, { Component } from 'react';
import './main.scss';
import axios from 'axios';
import Welcome from './Welcome/Welcome';
import Footer from '../Footer/Footer';
import About from '../About/About';
import Header from '../Header/Header';
import { StickyContainer } from 'react-sticky';

const API_URL = 'http://localhost:4000';


class Main extends Component {
    state = {
        data : {}
    }
    
    componentDidMount(){
        axios.get(`${API_URL}/getplayersummary`)
        .then((response) =>
            this.setState({
                data: response.data.response.players[0]
                
            }),
          )
        .catch(error  => {
            console.log(error)
        })
    }

    componentDidUpdate(){
        
    }
    render() {
        const userID = this.props.location.search.slice(9);
        // console.log(userID);
        
        // console.log("this is data", this.state.data.steamid)
        
        return (
            <div className="full">
            <div className="main">
                <div className="main__headline">
                <About/>
                </div>
                <div className="main__content">
                    <Welcome userID={userID} personaname={this.state.data.personaname} avatar={this.state.data.avatar}/>
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}

export default Main
