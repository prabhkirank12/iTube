import React from "react";
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom'
import Modal from './modal/modal'
import HomeContainer from './home/home_container';
import SignUpFormContainer from './user/signup_form_container';
import LogInFormContainer from './user/login_form_container';
import VideoShowContainer from './video/video_show_container';
import { AuthRoute} from '../util/route_util';

const App = () => {
    return (
        <div className="body">
            <Modal />
            <Switch>
                <Route exact path ="/" component={HomeContainer} />
                <Route path="/video/:videoId" component={VideoShowContainer} />
                <AuthRoute path="/login" component={LogInFormContainer} />
                <AuthRoute path="/signup" component={SignUpFormContainer} />
            </Switch>
        </div>
    )
};

export default App;