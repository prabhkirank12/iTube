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
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
          <br />
          Please {this.props.formType} or {this.props.navLink}
            {this.renderErrors()}
                <div>
                    <br />
                    <label>Email:
                        <input type="text" value={this.state.email} onChange={this.update('email')}/>
                    </label>
                    <br />
                    <label>Password:
                            <input type="password" value={this.state.password} onChange={this.update('password')}/>
                    </label>
                    <br />
                    <input type="submit" value={this.props.formType} />
                </div>
                </form>
            </div>
        );
    }
}

export default SessionForm;
