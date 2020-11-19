import { connect } from 'react-redux';

import { login } from '../../actions/session_actions';
import NavBar from './nav_bar';

const mapStateToProps = ({ session, entities: { users } }) => {
    return {
        currentUser: users[session.id]
    };
};


const mapDispatchToProps = dispatch => {
    return {
    login: (user) => dispatch(login(user))
    
}};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);
