import { connect } from 'react-redux';
import VideoShow from "./video_show";
import { fetchVideo, fetchVideos } from "../../actions/video_actions";
import { likeVideo, unlikeVideo, dislikeVideo, undislikeVideo, changeLikeVideo } from '../../actions/video_actions';

const mapStateToProps = (state, ownProps) => {
    const video = state.entities.videos[ownProps.match.params.videoId];
    const videos = state.entities.videos;
    return {
        video,
        videos,
        currentUser: state.entities.users[state.session.id]
    }
}

const mapDispatchToProps = dispatch => ({
    fetchVideo: (videoId) => dispatch(fetchVideo(videoId)),
    fetchVideos: () => dispatch(fetchVideos()),
    likeVideo: (videoId) => dispatch(likeVideo(videoId)),
    unlikeVideo: (videoId) => dispatch(unlikeVideo(videoId)),
    dislikeVideo: (videoId) => dispatch(dislikeVideo(videoId)),
    undislikeVideo: (videoId) => dispatch(undislikeVideo(videoId)),
    changeLikeVideo: (videoId) => dispatch(changeLikeVideo(videoId))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoShow)