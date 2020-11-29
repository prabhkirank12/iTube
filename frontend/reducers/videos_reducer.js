// import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import {
    RECEIVE_VIDEO,
    RECEIVE_ALL_VIDEOS,
    REMOVE_VIDEO
} from '../actions/video_actions';



const videosReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_VIDEO:
            newState = {[action.video.id]: action.video};
            return newState;
        case RECEIVE_ALL_VIDEOS:
            return action.videos;
        case REMOVE_VIDEO:
            delete newState[action.videoId];
            return newState;
        default:
            return state;
    }
};

export default videosReducer;