// import {
//     RECEIVE_LIKE,
//     RECEIVE_ALL_LIKES,
//     REMOVE_LIKE
// } from '../actions/like_actions';
import { RECEIVE_LIKED_VIDEOS, RECIEVE_LIKED_VIDEOS } from '../actions/video_actions';


const likesReducer = (state = {}, action) => {
    Object.freeze(state);
    // let newState = { ...state };
    switch (action.type) {
        // case RECEIVE_LIKE:
        //     newState = { [action.like.id]: action.like };
        //     return newState;
        // case RECEIVE_ALL_LIKES:
        //     return action.likes;
        // case REMOVE_LIKE:
        //     return newState;
        case RECEIVE_LIKED_VIDEOS:
            return action.videos;
        default:
            return state;
    }
};

export default likesReducer;