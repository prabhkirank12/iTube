import { connect } from 'react-redux';
import { createComment, createReply } from "../../actions/comment_actions";
import CommentsForm from "./comment_form";

const mapStateToProps = (state, ownProps) => {
    return {
        videoId: ownProps.videoId,
        parentId: ownProps.parentId,
        currentUser: state.entities.users[state.session.id],
        formType: "create",
    };
};

const mapDispatchToProps = disptach => {
    return {
        createComment: (videoId, comment) => disptach(createComment(videoId, comment)),
        createReply: (parentId, comment) => disptach(createReply(parentId, comment)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm);