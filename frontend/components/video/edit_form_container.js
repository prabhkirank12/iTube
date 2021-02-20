import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { updateVideo } from '../../actions/video_actions';
import uploadVideoForm from './upload_form';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.videos,
        video: state.entities.videos[ownProps.videoId],
        formType: "edit"
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (video) => dispatch(updateVideo(video)),
        closeModal: () => dispatch(closeModal())
    };
};

export default withRouter(mapStateToProps, mapDispatchToProps)(uploadVideoForm);