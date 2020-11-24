import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { login, logout } from '../../actions/session_actions';
import NavBar from './nav_bar';

const mapStateToProps = ({ session, entities: { users } }) => {
    return {
        currentUser: users[session.id]
    };
};


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        login: (user) => dispatch(login(user)),
        openModal: (modal) => dispatch(openModal(modal))
    
}};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);
