import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        const title = (this.props.formType === 'login') ? 'Sign in' : 'Create your Google Account'
        const fullSignup = (this.props.formType === 'signup') ? (
                <>
                    <label className="Name"> 
                    <input type="text" value={this.state.first_name} onChange={this.update('first_name')} placeholder="First Name" />
                    </label>
                    <br />
                    <br />
                    <label className="Name"> 
                        <input type="text" value={this.state.last_name} onChange={this.update('last_name')} placeholder="Last Name" />
                    </label>
                    <br />
                    <br />
                    
                </>
                    ) : null
        return (
            <div>
                <form className="theform" onSubmit={this.handleSubmit}>
                    <br />
                    <img src={window.googleUrl} alt="Google"/>
                    <br />
                    <p className="title">
                        {title} 
                    </p>
                    <p className="txt">
                        to continue to iTube
                    </p>
                    <br />
                        {this.renderErrors()}
                    <div>
                        <br />
                        { fullSignup }
                        <label className="email" >
                            <input type="text" value={this.state.email} onChange={this.update('email')} placeholder="Email"/>
                        </label>
                        <br />
                        <br />
                        <label className="password">
                                <input type="password" value={this.state.password} onChange={this.update('password')} placeholder="Password"/>
                        </label>
                        <br />
                        <p>
                            <input className="submitBttn" type="submit" value={this.props.formType} />
                        </p>
                    </div>
                    <span className="bottom">
                        {this.props.navLink}
                    </span>
                </form>
            </div>
        );
    }
}

export default SessionForm;
