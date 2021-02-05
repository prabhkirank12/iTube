import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { updateVideo } from '../../actions/video_actions';
import UploadVideoForm from './upload_form';

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.videos,
        videos: state.entities.videos,
        formType: "Edit"
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (video) => dispatchEvent(updateVideo(video)),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoForm);