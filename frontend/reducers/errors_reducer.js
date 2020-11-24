import { combineReducers } from "redux";

import sessionErrorsReducer from "./session_errors_reducer";
import videosErrorsReducer from "./videos_errors_reducer"

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    videosErrors: videosErrorsReducer
});

export default errorsReducer;