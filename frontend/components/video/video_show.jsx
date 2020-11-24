import React from 'react';
import { Link } from 'react-router-dom';

class VideoShow extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchVideo(this.props.id);
    }
    
    render() {
       if (this.props.video){
           return (
               <div>
                   <video width="300" height="200" autoPlay controls>
                       <source src={this.props.video.videoUrl} type="video/mp4" />
                   </video>
                   <div className="video-content">
                       <div className="video-title">
                           {this.props.video.title}
                       </div>
                       {this.props.video.created_at}
                   </div>
                   <Link to="/">Back</Link>
               </div>
           )
       }else{
           return(
               <h1>No video here</h1>
           )
       }
    }
}

export default VideoShow;
