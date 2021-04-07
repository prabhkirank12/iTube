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
        this.titleText = this.titleText.bind(this);
        this.titleCaption = this.titleCaption.bind(this);
        this.imageIcon = this.imageIcon.bind(this);
        this.submitBttn = this.submitBttn.bind(this);
    }

    componentDidMount(){
        this.props.clearErrors();
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
        const { errors, match } = this.props;
        const error = errors[0];
        const errorClass = (this.props.formType === 'login') ?  'error' : 'signupErrors';
        return (
            <>
                <ul className={errorClass}>
                    {error}
                </ul>
            </>
        )
        
    }

    buttonText() {
        let className = 'bottom';
        if (this.props.navLink.props.to === "/login") {
            className = 'signInLink';
        }
        // console.log(this.props.navLink.props.to)
        return <span className={className}>{this.props.navLink}</span>
    }

    imageIcon() {
        let className = 'signInImg'
        if (this.props.formType !== 'login') {
            className = 'signUpImg';
        }
        return <img src={window.iconUrl} className={className} alt="iTube" />
    }

    titleText(){
        const title = (this.props.formType === 'login') ? 'Sign in' : 'Create your Google Account'
        let className = 'title';
        if (this.props.formType !== 'login') {
            className = 'signUpTitle';
        }
        return <p className = {className}>{title}</p>
    }

    titleCaption(){
        let className = 'txt';
        if (this.props.formType !== 'login') {
            className = 'signUpText';
        }
        return <p className={className}>to continue to iTube</p>;
    }

    submitBttn(){
        let className = 'submitBttn'
        if (this.props.formType !== 'login') {
            className = 'signUpBttn';
        }
        return <p><button className={className}>{this.props.formType}</button></p>
    }

    render() {
        const photo = (this.props.formType === 'signup') ? <img src={window.signupUrl} />: null ;
        const fullSignup = (this.props.formType === 'signup') ? (
                <>
                    {/* <label htmlFor="fname" className="Name"> First Name</label> */}
                    <input id="fname" type="text" value={this.state.first_name} onChange={this.update('first_name')} placeholder="First Name" />
                    {/* <label htmlFor="lname" className="Name"> Last Name</label> */}
                    <input id="lname" type="text" value={this.state.last_name} onChange={this.update('last_name')}  placeholder="Last Name" />
                    <br />
                    <br /> 
                </>
                    ) : null;
        return (
            <div className="form-div">
                <form className={this.props.formType === 'login' ? "theform" : "signup-form"} onSubmit={this.handleSubmit}>
                    {this.imageIcon()}
                    {this.titleText()}
                    {this.titleCaption()}
                    {this.renderErrors()}
                    
                    <div className={this.props.formType === 'login' ? "login-div" : "signup-div"} >
                        <br />
                        { fullSignup }
                        <input id='email' type="text" value={this.state.email} onChange={this.update('email')} placeholder="Email" />
                        {/* <label htmlFor="email" className="email" >Email</label> */}
                        <br />
                        <br />
                        <input id="password" type="password" value={this.state.password} onChange={this.update('password')} placeholder="Password"/>
                        {/* <label htmlFor="password" className={this.props.formType === 'login' ? "password" : 'signup-password'}>Password</label> */}
                        <br />
                        <div className="signupPhoto">
                            {photo}
                        </div>
                        {this.submitBttn()}
                        {this.buttonText()}
                    </div>
                </form>
            </div>
        );
    }
}

export default SessionForm;
