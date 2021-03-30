import React from 'react'
import VideoIndexItem from './video_index_item';

class VideoIndex extends React.Component {
    constructor(props){
        super(props);
        // this.handleShowVideos = this.handleShowVideos.bind(this);
    }

    componentDidMount(){
        this.props.allVideos();
        // this.handleVideos();
    }

    // handleVideosAction() {
    //     const { allVideos, fetchSearchQuery, location, match} = this.props;
    //     switch (match.path) {
    //         case "/results":
    //             fetchSearchQuery(location.search)
    //             break;
    //         default:
    //             allVideos()
    //             break;
    //     }
    // }

    // handleShowVideos() {
    //     const { videos, match, filters } = this.props;
    //     let allVideos = [];
    //     switch (match.path) {
    //         case "/results":
    //             allVideos = [...filters].reverse().map(videoId => videos[videoId])
    //             break;
    //         default:
    //             allVideos = videos
    //             break;
    //     }
    //     const showVideos = allVideos.map(video => {
    //         return (
    //             <VideoIndexItem video={video} key={video.id} history={this.props.history} />
    //         )
    //     })
    //     return showVideos;
    // }


    render(){
        const showVideos = this.props.videos.map(video => {
            return(
                <VideoIndexItem video={video} key={video.id} history={this.props.history}/>
            )
        })
        return(
            <div className="videos-div">
                {showVideos}
            </div>
        )
    }

}

export default VideoIndex;