import { connect } from 'react-redux';
import VideoShow from "./video_show";
import { fetchVideo } from "../../actions/video_actions";

const mapStateToProps = (state, {match}) => {
    const id = match.params.videoId;
    const video = state.entities.videos[id];
    return {
        id,
        video
    }
}

const mapDispatchToProps = dispatch => ({
    fetchVideo: (videoId) => dispatch(fetchVideo(videoId))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoShow)