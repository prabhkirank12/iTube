import { connect } from 'react-redux';
import { fetchComments, createComment } from '../../actions/comment_actions';
import commentIndex from './comment_index';

const mapStateToProps = (state, ownProps) => {
    return {
        comments: state.entities.comments,
        video: state.entities.videos[ownProps.match.params.videoId],
        currentUser: state.entities.users[state.session.id]
    }
}