import React from 'react'
import VideoIndexItem from './video_index_item';

class VideoIndex extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.allVideos();
    }

    render(){
        const videos = this.props.videos.map(video => {
            return(
                <VideoIndexItem video={video} key={video.id} history={this.props.history}/>
            )
        })
        return(
            <div className="videos-div">
                {videos}
            </div>
        )
    }

}

export default VideoIndex;