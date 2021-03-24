import { connect } from "react-redux";
import { fetchUser } from "../../actions/session_actions";
import {
    deleteComment, deleteReply, updateComment, 
    likeComment, unlikeComment, dislikeComment, 
    undislikeComment, changeLikeComment } from "../../actions/comment_actions";
import CommentIndexItem from "./comment_index_item";

const mapStateToProps = (state, ownProps) => {
    return {
        commenter: state.entities.users[ownProps.comment.commenterId],
        // comment: ownProps.comment,
        currentuserId: state.session.id,
        comments: state.entities.comments
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteComment: (commentId) => dispatch(deleteComment(commentId)),
        deleteReply: (replyId) => dispatch(deleteReply(replyId)),
        updateComment: (comment) => dispatch(updateComment(comment)),
        likeComment: (commentId) => dispatch(likeComment(commentId)),
        unlikeComment: (commentId) => dispatch(unlikeComment(commentId)),
        dislikeComment: (commentId) => dispatch(dislikeComment(commentId)),
        undislikeComment: (commentId) => dispatch(undislikeComment(commentId)),
        changeLikeComment: (commentId) => dispatch(changeLikeComment(commentId)),
        fetchUser: (userId) => dispatch(fetchUser(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndexItem);
