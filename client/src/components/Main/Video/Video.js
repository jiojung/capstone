import React, { Component } from 'react'
import video_1 from '../../../assets/video/video.mp4'
class Video extends Component {
    render() {
        return (
            <div>
                <video className='videoTag' autoPlay loop muted>
                    <source src={video_1} type='video/mp4' />
                </video>
            </div>
        )
    }
}

export default Video
