import { connect } from 'react-redux';
import VideoIndex from "./video_index";
import { fetchVideos, fetchSearchQuery } from "../../actions/video_actions";

const mapStateToProps = state => {
    return{
        videos: Object.values(state.entities.videos),
    }
}

const mapDispatchToProps = dispatch => ({
    allVideos: () => dispatch(fetchVideos()),
    fetchSearchQuery: searchQuery => dispatch(fetchSearchQuery(searchQuery))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex)