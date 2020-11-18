import React from "react";
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom'

import HomeContainer from './home/home_container';
import SignUpFormContainer from './user/signup_form_container';
import LogInFormContainer from './user/login_form_container';

const App = () => (
    <div>
        <header>
            <h1>Welcome to iTube</h1>
            <HomeContainer />
        </header>
        <Switch>
            <Route exact path="/login" component={LogInFormContainer} />
            <Route exact path="/signup" component={SignUpFormContainer} />
        </Switch>
    </div>
);

export default App;