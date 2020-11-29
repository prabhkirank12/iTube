import * as LikeUtil from "../util/like_api_util";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const RECEIVE_ALL_LIKES = "RECEIVE_ALL_LIKES";
export const REMOVE_LIKE = "REMOVE_LIKE";

const receiveLike = (like) => {
    return {
        type: RECEIVE_LIKE,
        like
    }
}

const receiveAllLikes = (likes) => {
    return {
        type: RECEIVE_ALL_LIKES,
        likes
    }
}

const removeLike = () => {
    return {
        type: REMOVE_LIKE
    }
}

export const fetchLikes = (likeType, likeId) => dispatch => (
    VideoUtil.fetchLikes(likeType, likeId)
        .then(likes => dispatch(receiveAllLikes(likes)))
)

export const deleteLike = like => dispatch => (
    VideoUtil.deleteLike(like)
        .then(() => dispatch(removeLike()))
)

export const updateLike = like => dispatch(
    VideoUtil.updateLike(like)
        .then(like => dispatch(receiveLike(like)))
)

export const createLike = like => dispatch(
    VideoUtil.createLike(like)
        .then(like => dispatch(receiveLike(like)))
)

