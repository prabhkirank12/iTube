import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { uploadVideo } from '../../actions/video_actions';
import uploadVideoForm from './upload_form';

const mapStateToProps = ({ errors }) => {
    return {
        errors: errors.videos,
        formType: 'upload'
    }
}

const mapDispatchToProps = dispatch => {
    return {
        processForm: (video) => dispatch(uploadVideo(video)),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(uploadVideoForm)