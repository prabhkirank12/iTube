//The Sign up and log in forms
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
        this.buttonText = this.buttonText.bind(this);
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

    buttonText() {
        let className = 'bottom';
        if (this.props.navLink.props.to === "/login") {
            className = 'signInLink';
        }
        // console.log(this.props.navLink.props.to)
        return <span className={className}>{this.props.navLink}</span>
    }

    render() {
        const photo = (this.props.formType === 'signup') ? <img src={window.logoUrl} />: null ;
        const title = (this.props.formType === 'login') ? 'Sign in' : 'Create your Google Account'
        const fullSignup = (this.props.formType === 'signup') ? (
                <>
                    {/* <label htmlFor="fname" className="Name"> First Name</label> */}
                    <input id="fname" type="text" value={this.state.first_name} onChange={this.update('first_name')} placeholder="First Name"/>
                    {/* <label htmlFor="lname" className="Name"> Last Name</label> */}
                    <input id="lname" type="text" value={this.state.last_name} onChange={this.update('last_name')}  placeholder="Last Name"/>
                    <br />
                    <br /> 
                </>
                    ) : null;
        return (
            <div className="form-div">
                <form className={this.props.formType === 'login' ? "theform" : "signup-form"} onSubmit={this.handleSubmit}>
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
                    <div className={this.props.formType === 'login' ? "login-div" : "signup-div"} >
                        <br />
                        { fullSignup }
                        <input id="email" type="text" value={this.state.email} onChange={this.update('email')} placeholder="Email"/>
                        {/* <label htmlFor="email" className="email" >Email</label> */}
                        <br />
                        <br />
                        <input id="password" type="password" value={this.state.password} onChange={this.update('password')} placeholder="Password"/>
                        {/* <label htmlFor="password" className={this.props.formType === 'login' ? "password" : 'signup-password'}>Password</label> */}
                        <br />
                        <p>
                            <button className="submitBttn">{this.props.formType}</button> 
                        </p>
                        <div className="signup-photo">
                            {photo}
                        </div>
                    </div>
                    {this.buttonText()}
                </form>
            </div>
        );
    }
}

export default SessionForm;
