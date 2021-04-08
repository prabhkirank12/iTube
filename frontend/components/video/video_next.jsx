import React from 'react'
import { Link} from 'react-router-dom';
import VideoShow from './video_show'

function VideoNext({ video, history }) {
    let videoShowUrl = `/video/${video.id}`;
    return (
        <div className="one-videos">
            <Link to={videoShowUrl}>
                <video className="video" width="200" height="100" controls>
                    <source src={video.videoUrl} type="video/mp4" />
                </video>
                <div className="side-video-title">
                    {video.title}
                </div>
            </Link>
        </div>
    )
}

export default VideoNext

