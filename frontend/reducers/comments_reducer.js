import {
    RECEIVE_COMMENT,
    RECEIVE_COMMENTS,
    REMOVE_COMMENT,
    RECEIVE_REPLY,
    REMOVE_REPLY
} from '../actions/comment_actions';

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return action.comments;
        case RECEIVE_COMMENT:
            newState = { [action.comment.id]: action.comment };
            return newState;
        case REMOVE_COMMENT:
            delete newState[action.commentId];
            return newState;
        case REMOVE_REPLY:
            newState[action.reply.parentId].repliesIds = newState[action.reply.parentId].repliesIds.filter(ele => ele !== action.reply.id);
            delete newState[action.reply.id];
            return newState;
        case RECEIVE_REPLY:
            newState[action.reply.parentId].repliesIds.push(action.reply.id);
            newState[action.reply.id] = action.reply;
            return newState;
        default:
            return state;
    }
};

export default commentsReducer;