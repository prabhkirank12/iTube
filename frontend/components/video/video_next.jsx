import React from 'react'

function VideoNext({ video, history }) {
    return (
        <div className="one-videos">
            <video className="video" width="200" height="100" controls onClick={() => { history.push(`/video/${video.id}`) }}>
                <source src={video.videoUrl} type="video/mp4" />
            </video>
            <div className="side-video-title">
                {video.title}
            </div>
        </div>
    )
}

export default VideoNext

