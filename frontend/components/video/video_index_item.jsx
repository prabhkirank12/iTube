import React from 'react'

function VideoIndexItem({video, history}) {
    return (
        <div className="one-video">
            <video width="300" height="200" controls onClick={() => { history.push(`/video/${video.id}`) }}>
                <source src={video.videoUrl} type="video/mp4" />
            </video>
            <div className="video-content">
                <div className="video-title">
                    {video.title}
                </div>
                {video.created_at}
            </div>
        </div>
    )
}

export default VideoIndexItem

