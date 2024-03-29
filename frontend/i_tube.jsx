//Entry file
import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root"
import { signup, login, logout } from "./util/session_api_util"


document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    // const store = configureStore();
    let store;
    // debugger;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: {
                    [window.currentUser.id]: window.currentUser
                }
            },
            session: {
                id: window.currentUser.id
            }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    
    ReactDOM.render(<Root store={store} />, root);
    //Testing
    // window.getState = store.getState;
    // window.dispatch = store.dispatch;
    // window.login = login;
    // window.signup = signup;
    // window.logout = logout;
});
