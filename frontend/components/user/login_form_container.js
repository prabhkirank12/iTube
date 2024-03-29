import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
    return {
        errors: errors.session,
        formType: 'login',
        navLink: <Link to="/signup">Create account</Link>,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearErrors: () => dispatch(clearErrors()),
        processForm: (user) => dispatch(login(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
