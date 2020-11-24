import {
    RECEIVE_ERRORS
} from '../actions/video_actions';

const videosErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ERRORS:
            return action.errors;
        default:
            return state;
    }
};

export default videosErrorsReducer;
