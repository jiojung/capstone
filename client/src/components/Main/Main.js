import React, { Component } from 'react';
import './main.scss';
import axios from 'axios';
import Video from './Video/Video';
import Welcome from './Welcome/Welcome';


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
            <div className="main">
                {/* <Video/> */}
                <div className="main__headline">
                    <h1>Welcome to Steamatch.</h1>
                </div>
                <div className="main__content">
                    <Welcome userID={userID} personaname={this.state.data.personaname} avatar={this.state.data.avatar}/>
                </div>
            </div>
        )
    }
}

export default Main
