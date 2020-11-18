import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
    }

    handleDemoSubmit() {
        const user = {
            email: 'demoUser@yahoo.com',
            password: 'password'
        };
        this.props.login(user);
    }

    render () {
        const sessionLinks = () => (
            <nav>
                <Link to="/login">Login</Link>
                <button onClick={this.handleDemoSubmit}>Demo User</button> 
            </nav>
        );
        const personalHome = () => (
            <hgroup>
                <h2>Hi, {this.props.currentUser.first_name}!</h2>
                <button onClick={this.props.logout}>Sign Out</button>
            </hgroup>
        );
        return this.props.currentUser ? personalHome() : sessionLinks();
    }
}
export default Home;
