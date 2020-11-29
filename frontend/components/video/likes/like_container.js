import { connect } from 'react-redux';
import Like from "./like";
import { login } from "../../../actions/session_actions";
import { createLike, updateLike, deleteLike, fetchLikes } from "../../../actions/like_actions";

const mapStateToProps = (state) => ({
        currentUser: state.entities.users[state.sesssion.id]
})

const mapDispatchToProps = dispatch => ({
    createLike: (like) => dispatch(createLike(like)),
    updateLike: (like) => dispatch(updateLike(like)),
    deleteLike: (like) => dispatch(deleteLike(like)),
    fetchLikes: (type, id) => dispatch(fetchLikes(type, id)),
    login: (user) => dispatch(login(user)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Like)