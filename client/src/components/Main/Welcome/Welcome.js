import React, { Component } from 'react'
import '../../../../node_modules/aos/dist/aos.css';
import './welcome.scss';
import AOS from 'aos';
import axios from 'axios';
const API_URL = 'http://localhost:4000';
AOS.init({
    duration: 1200
   });


class Welcome extends Component {
    constructor(props) { 
        super(props);
     this.state = {
        userdata : {},
        usergames : {},
        allusers:{},
        clicked:[],
        newfornow: {},
        userrecent: {}
    }
}
    
    
    componentDidMount(){
        axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=A9AF4EC788FFD1B9A079A36B0A93BDFC&steamids=` +this.props.userID)
        .then((response) =>
            this.setState({
                userdata: response.data.response.players[0]
                
            }),
          )
        .catch(error  => {
            console.log(error)
        })
        axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=A9AF4EC788FFD1B9A079A36B0A93BDFC&steamid=`+this.props.userID+`&format=json`)
        .then((response) =>
        this.setState({
            usergames: response.data.response.games
        }),
        )
        .catch(error  => {
            console.log(error)
        })
        axios.get(` http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=A9AF4EC788FFD1B9A079A36B0A93BDFC&steamid=`+this.props.userID+`&format=json`)
        .then((response) =>
        this.setState({
            userrecent: response.data.response.games[0]
        }),
        )
        .catch(error  => {
            console.log(error)
        })
        axios.get(`${API_URL}/userinfo`)
        .then((response) =>
        this.setState({
            allusers: response.data
        }),
        )
        .catch(error  => {
            console.log(error)
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        axios.post(`${API_URL}/userinfo`,  {
            "steamid": this.state.userdata.steamid,
            "communityvisibilitystate": this.state.userdata.communityvisibilitystate,
            "profilestate": this.state.userdata.profilestate,
            "personaname": this.state.userdata.personaname,
            "commentpermission": this.state.userdata.commentpermission,
            "profileurl": this.state.userdata.profileurl,
            "avatar": this.state.userdata.avatar,
            "avatarmedium": this.state.userdata.avatarmedium,
            "avatarfull": this.state.userdata.avatarfull,
            "avatarhash": this.state.userdata.avatarhash,
            "lastlogoff": this.state.userdata.lastlogoff,
            "personastate": this.state.userdata.personastate,
            "primaryclanid": this.state.userdata.primaryclanid,
            "timecreated": this.state.userdata.timecreated,
            "personastateflags": this.state.userdata.personastateflags,
            "loccountrycode": this.state.userdata.loccountrycode,
            "locstatecode": this.state.userdata.locstatecode,
            "usergames": this.state.usergames,
            "userrecent": this.state.userrecent
        })
        this.setState({
            clicked: [1]
        })
        this.setState({
            newfornow: this.state.allusers.filter(el => el.steamid !== this.state.userdata.steamid
            )
          });
    }
    
    

    render() {
        const friend = this.state.newfornow[Math.floor(Math.random()*this.state.newfornow.length)]
        return (
            <div className="welcome" data-aos="fade-right">
                {this.props.userID.length === 0 ?
                    <>
                    <h2>Get Started</h2> 
                    <p><a href ={`${API_URL}/auth/openid`}><img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_large_noborder.png" alt="user profile pic"/></a></p>
                    </>
                    :
                    <>
                    {this.state.clicked.length === 0 ?
                    <>
                    <div className="welcome__user">
                        <div className="welcome__helloname">
                        <h2>Hello</h2>
                        <h2>{this.state.userdata.personaname}</h2>
                        </div>
                        <p><img src={this.state.userdata.avatarfull} alt="player avatar" className="playeravatar"/></p>
                    </div>
                    <p><a href ={`${API_URL}/auth/logout`}>Logout</a></p>
                    <form id="matchUser" onSubmit={this.onSubmit}>
                        <button type='submit'>Match me</button>
                    </form>
                    </>
                    :
                    <>
                    <div className="welcome__main" data-aos="flip-up" >
                        <div className="welcome__friend" >
                        <h3>Here is your new friend!</h3>
                        <p><img src={friend.avatarfull} alt="friend's avatar" className="playeravatar"/></p>
                        <p><a href ={`${API_URL}/auth/logout`}>Logout</a></p>
                        </div>
                        <div className="welcome__container" >
                            <div className="welcome__data" data-aos="flip-up">
                                <p>Their name is {friend.personaname}</p>
                                <p>They live in {friend.locstatecode}, {friend.loccountrycode}</p>
                                <p>Recently they've been enjoying <a href={`https://steamcommunity.com/app/${friend.userrecent.appid}`} target="_blank" rel="noopener noreferrer">{friend.userrecent.name}</a></p>
                                <p>Here is a link to their <a href={`https://steamcommunity.com/profiles/${friend.steamid}`} target="_blank" rel="noopener noreferrer">profile</a></p>
                            </div>
                            <div className="welcome__button">
                                <form id="matchUser" onSubmit={this.onSubmit}>
                                    <button type='submit'>Match me again</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    </>
                    }
                    </>
                }  
            </div>
        )
    }
}

export default Welcome
