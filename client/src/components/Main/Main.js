import React, { Component } from 'react';
import './main.scss';
import axios from 'axios';
import Welcome from './Welcome/Welcome';
import Footer from '../Footer/Footer';
import About from '../About/About';

const API_URL = 'http://localhost:4000';


class Main extends Component {
    state = {
        data : {}
    }
    
    componentDidMount(){
        const userID = this.props.location.search.slice(9);
        axios.get(`${API_URL}/getplayersummary?steamid=${userID}`)
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
                
        return (
            <div className="full">
            <div className="main">
                <div className="main__headline">
                <About/>
                </div>
                <div className="main__content">
                    <Welcome userID={userID}/>
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}

export default Main
