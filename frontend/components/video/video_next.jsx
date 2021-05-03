import React from 'react'
import { Link} from 'react-router-dom';
import { timeSinceUpload } from '../../util/format_date_util';

class VideoNext extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUser(this.props.video.uploader_id);
    }

    render() {
        if (!this.props.users[this.props.video.uploader_id]){
            return null ;
        } else {
            let uploader = this.props.users[this.props.video.uploader_id];
            let videoShowUrl = `/video/${this.props.video.id}`;
            return (
                <Link to={videoShowUrl} id="next-video-container">
                    <video src={this.props.video.videoUrl} muted></video>
                    <div id="vidoe-next-content">
                        <p id="video-next-title">{this.props.video.title}</p>
                        <p id="video-next-uploader">{uploader.first_name}</p>
                        <p id="video-next-time">{timeSinceUpload(this.props.video.created_at)}</p>
                    </div>
                </Link>
            )
        }
    }
}

export default VideoNext

