
import { RECEIVE_LIKED_VIDEOS } from '../actions/video_actions';


const likesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LIKED_VIDEOS:
            return action.videos;
        default:
            return state;
    }
};

export default likesReducer;