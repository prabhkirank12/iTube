import { connect } from 'react-redux';
import VideoShow from "./video_show";
import { fetchVideo, fetchVideos, deleteVideo } from "../../actions/video_actions";
import { fetchUser } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions"
import { likeVideo, unlikeVideo, dislikeVideo, undislikeVideo, changeLikeVideo } from '../../actions/video_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    const video = state.entities.videos[ownProps.match.params.videoId];
    const videos = state.entities.videos;
    const users = state.entities.users;
    const isModal= Boolean(state.ui.modal);
    return {
        video,
        videos,
        users,
        currentUser: state.entities.users[state.session.id],
        isModal 
    }
}

const mapDispatchToProps = dispatch => ({
    removeVideo: (videoId) => dispatch(deleteVideo(videoId)),
    fetchVideo: (videoId) => dispatch(fetchVideo(videoId)),
    fetchVideos: () => dispatch(fetchVideos()),
    likeVideo: (videoId) => dispatch(likeVideo(videoId)),
    unlikeVideo: (videoId) => dispatch(unlikeVideo(videoId)),
    dislikeVideo: (videoId) => dispatch(dislikeVideo(videoId)),
    undislikeVideo: (videoId) => dispatch(undislikeVideo(videoId)),
    changeLikeVideo: (videoId) => dispatch(changeLikeVideo(videoId)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    openEditModal: () => dispatch(openModal('edit')),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoShow));