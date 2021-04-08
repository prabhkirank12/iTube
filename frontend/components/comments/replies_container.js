import { connect } from 'react-redux';
import Replies from './replies';

const mapStateToProps = (state, ownProps) => {
    return({
        comments: state.entities.comments,
        parent: ownProps.parent
    })
}

export default connect(mapStateToProps)(Replies);