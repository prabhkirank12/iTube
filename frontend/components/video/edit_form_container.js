import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { updateVideo } from '../../actions/video_actions';
import uploadVideoForm from './upload_form';

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

export default connect(mapStateToProps, mapDispatchToProps)(uploadVideoForm);