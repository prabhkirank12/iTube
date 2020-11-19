import React from "react";
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom'

import HomeContainer from './home/home_container';
import SignUpFormContainer from './user/signup_form_container';
import LogInFormContainer from './user/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
    // debugger;
    return (
        <div>
            <Switch>
                <Route exact path ="/" component={HomeContainer} />
                <AuthRoute path="/login" component={LogInFormContainer} />
                <AuthRoute path="/signup" component={SignUpFormContainer} />
            </Switch>
        </div>
    )
};

export default App;