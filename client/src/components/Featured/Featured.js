import React, { Component } from 'react'
import './featured.scss'
import '../../../node_modules/aos/dist/aos.css';
import AOS from 'aos';
import axios from 'axios';
const API_URL = 'http://localhost:4000';
AOS.init({
    duration: 1200
   });

class Featured extends Component {
    constructor(props) { 
        super(props);
     this.state = {
       news1:{},
       news2:{},
       news3:{}
    }
}
    componentDidMount(){
        axios.get(`${API_URL}/getnews`)
        .then((response) =>
        this.setState({
            news1:response.data.appnews.newsitems[0],
            news2:response.data.appnews.newsitems[1],
            news3:response.data.appnews.newsitems[2]
        }),
        )
        .catch(error  => {
            console.log(error)
        })
    }
    render() {
        return (
            <div className="news" id="news">
                <div className="news__article" data-aos="fade-right">
                    <h2>Featured</h2>
                    <a href="https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/" rel="noopener noreferrer" target="_blank"><h3>Counter Strike: Global Offensive</h3></a>
                    <p>Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).</p>
                    <h2>News</h2>
                    <div className="news__article--1">
                        <a href={this.state.news1.url} rel="noopener noreferrer" target="_blank">
                            <h4>{this.state.news1.title}</h4>
                        </a>
                    </div>
                    <div className="news__article--1">
                        <a href={this.state.news2.url} rel="noopener noreferrer" target="_blank">
                            <h4>{this.state.news2.title}</h4>
                        </a>
                    </div>
                    <div className="news__article--1">
                        <a href={this.state.news3.url} rel="noopener noreferrer" target="_blank">
                            <h4>{this.state.news3.title}</h4>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Featured
