import React from 'react'
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";


class UploadForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            videoFile: null,
            videoUrl: null            
        };
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);

    }

    componentDidMount() {
        if (this.props.formType === "edit") {
            this.handleEdit();
        }
    }

    handleFile(e){
        const video = e.currentTarget.files[0];
        const videoReader = new FileReader();

        videoReader.onloadend = (e) => {
            const link = e.target.result;
            this.setState({videoFile: video, videoUrl: link, title: video.name});
        };

        if (video) {
            videoReader.readAsDataURL(video);
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        let video = {};

        if (this.props.formType === 'edit') {
            let parts = this.props.location.pathname.split('/');
            let currentVideoId = parts.pop();
            video = {
                id: currentVideoId,
                title: this.state.title,
                body: this.state.body
            };
            this.props.processForm(video);
        } else {
            formData.append('video[title]', this.state.title);
            formData.append('video[description]', this.state.description);
            formData.append('video[video]', this.state.videoFile);
            this.props.processForm(formData);
        }
        this.props.closeModal();
    }

    handleEdit(){
        let parts = this.props.location.pathname.split('/');
        let currentVideoId = parts.pop();
        let currentVideo = this.props.videos[currentVideoId];
        this.setState({ title: currentVideo.title, body: currentVideo.body, videoUrl: currentVideo.videoUrl})
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation;
    }

    handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation;
    }

    handleDrop(e){
        e.preventDefault();
        e.stopPropagation;
        const video = e.dataTransfer.files[0];
        this.setState({ videoFile: video});
    }


    render() {
        return (
            <div className="modal-div">
                <div className="formTitle">
                    <p className="form-header">
                        Upload Videos
                    </p>
                    <IoIcons.IoMdClose className="crossIcon" onClick={this.props.closeModal} />
                </div>
                <hr />
                <div className="upload-file"
                        onDrop={this.handleDrop}
                        onDragEnter={this.handleDragEnter}
                        onDragOver={this.handleDragOver} >
                 
                    <label>
                        <input className="upload-icon-input" type="file" onClick={this.handleFile} />
                        <MdIcons.MdFileUpload className="upload-icon" />
                    </label>
                    <p className="topText">Drag and drop video files to upload</p>
                    <p className="bttmText">Your videos will be private until you publish them.</p>
                    <label className="select-label"> 
                        <input className="select-bttn-input" type="file" 
                        accept=".mkv, .webm, .flv, .vob, .mng, .avi, .wmv, .qt, .mp4, .mpg, .m4v"
                        onChange={this.handleFile} />
                        {/* <button onClick={this.handleSubmit} className="select-bttn">Select Files</button> */}
                    </label>
                    <button className="select-bttn" onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}

export default UploadForm;