import React, { Component } from 'react';
import './main.scss';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

class Main extends Component {
    state = {
        data : {}
    }

    // componentDidMount(){
    //     axios.get(`${API_URL}/auth/openid`)
    //     .then((response) =>
    //         this.setState({
    //             data: response.data
                
    //         }),
    //         console.log(this.data)
    //       )
    //     .catch(error  => {
    //         console.log(error)
    //     })
    // }
    render() {
        return (
            <div className="main">
                <h1>Welcome to Steamatch.</h1>
               <h2>Log in</h2> 
               <p><a href ={`${API_URL}/auth/openid`}><img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_large_noborder.png"/></a></p>
               <p><a href ='http://localhost:4000/auth/logout'>Logout</a></p>
            </div>
        )
    }
}

export default Main
