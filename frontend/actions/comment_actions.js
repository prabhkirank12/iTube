import * as CommentUtil from "../util/comment_api_util";
import * as LikeUtil from "../util/like_api_util";

export const RECEIVE_COMMENTS= "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const RECEIVE_REPLY = "RECEIVE_REPLY";
export const REMOVE_REPLY = "REMOVE_REPLY";

const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

const receiveComment = (comment) => {
    return {
        type: RECEIVE_COMMENT,
        comment
    }
}

const receiveReply= (reply) => {
    return {
        type: RECEIVE_REPLY,
        reply
    }
}

const removeComment = (commentId) => {
    return {
        type: REMOVE_COMMENT,
        commentId
    }
}

const removeReply = (reply) => {
    return {
        type: REMOVE_REPLY,
        reply
    }
}

export const fetchComments = videoId => dispatch => (
    CommentUtil.fetchComments(videoId)
        .then(comments => dispatch(receiveComments(comments)))
)

export const createComment = (videoId, comment) => dispatch => (
    CommentUtil.createComments(videoId, comment)
        .then(comment => dispatch(receiveComment(comment)))
)

export const deleteComment = commentId => dispatch => (
    CommentUtil.deleteComment(commentId)
        .then(() => dispatch(removeComment(commentId)))
)

export const updateComment = comment => dispatch => (
    CommentUtil.updateComment(comment)
        .then(comment => dispatch(receiveComment(comment)))
)

export const createReply = (commentId, comment) => dispatch => (
    CommentUtil.createReply(commentId, comment)
        .then(comment => dispatch(receiveReply(comment)))
)

export const deleteReply = (reply) => dispatch => (
    CommentUtil.deleteReply(reply.id)
        .then(reply => dispatch(removeReply(reply)))
)


export const likeComment = (commentId) => dispatch => {
    LikeUtil.likeComment(commentId)
        .then(comment => dispatch(receiveComment(comment)))
}

export const unlikeComment = (commentId) => dispatch => {
    LikeUtil.unlikeComment(commentId)
        .then(comment => dispatch(receiveComment(comment)))
}

export const dislikeComment = (commentId) => dispatch => {
    LikeUtil.dislikeComment(commentId)
        .then(comment => dispatch(receiveComment(comment)))
}

export const undislikeComment = (commentId) => dispatch => {
    LikeUtil.undislikeComment(commentId)
        .then(comment => dispatch(receiveComment(comment)))
}

export const changeLikeComment = (commentId) => dispatch => {
    LikeUtil.changeLikeComment(commentId)
        .then(comment => dispatch(receiveComment(comment)))
}