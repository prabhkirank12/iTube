import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { updateVideo } from '../../actions/video_actions';
import uploadVideoForm from './upload_form';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    // debugger;
    return {
        errors: state.errors.videos,
        videos: state.entities.videos,
        formType: "edit"
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (video) => dispatch(updateVideo(video)),
        closeModal: () => dispatch(closeModal())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(uploadVideoForm));