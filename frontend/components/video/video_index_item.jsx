import React from 'react'
import { formatDate } from '../../util/format_date_util';

function VideoIndexItem({video, history}) {
    return (
        <div className="one-video">
            <video className="video" width="300" height="200" controls onClick={() => { history.push(`/video/${video.id}`) }}>
                <source src={video.videoUrl} type="video/mp4" />
            </video>
            <div className="video-data">
                <div className="video-logo">
                    <button className="logo-icon">{video.id}</button>
                </div>
                <div className="video-title">
                    {video.title}
                    <br/>
                    <p> {formatDate(video.created_at)} </p>
                </div>
            </div>
        </div>
    )
}

export default VideoIndexItem

