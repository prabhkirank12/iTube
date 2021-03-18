import { connect } from 'react-redux';
import { fetchComments, createComment } from '../../actions/comment_actions';
import CommentIndex from './comment_index';

const mapStateToProps = (state, ownProps) => {
    return {
        comments: state.entities.comments,
        video: ownProps.video,
        users: state.entities.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchComments: (videoId) => dispatch(fetchComments(videoId)),
        deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    };
};

export default connect (mapStateToProps, mapDispatchToProps)(CommentIndex);