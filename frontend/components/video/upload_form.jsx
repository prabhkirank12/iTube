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

        //the drag and drop methods
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
    }

    componentDidMount() {
        if (this.props.formType === "edit") {
            this.handleEdit();
        }
    }

    componentDidUpdate() {
        let submitBttn = document.getElementById("video-submit-bttn");
        if (this.state.title.length === 0){
            submitBttn.setAttribute('disabled', '');
        } else {
            submitBttn.removeAttribute('disabled', '');
        }
    }

    handleFile(e){
        const video = e.currentTarget.files[0];
        const videoReader = new FileReader();

        videoReader.onloadend = (e) => {
            const link = e.target.result;
            this.setState({videoFile: video, videoUrl: link, title: video.name});
        };

        if (video) videoReader.readAsDataURL(video);
    }

    handleSubmit(e){
        e.preventDefault();
        let formData = new FormData();
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

    handleInput(field) {
        return(e) => {
            this.setState({ [field]: e.target.value });
        };
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
        let file = '';
        if (this.state.videoFile) {
            file = this.state.videoFile.name;
        } else {
            file = this.state.title;
        }

       if(this.state.videoFile || this.state.videoUrl) {
           return (
               <>
                    <div className="video-form-container">
                        <div className="video-form-header">
                            <h2>{this.state.title}</h2>
                            <IoIcons.IoMdClose className="cross-icon" onClick={this.props.closeModal} />
                        </div>
                        <hr />
                        <div className="info-section">
                            <h1 className="details-heading">Details</h1>
                            <div>
                                <form className="video-preview-form" onSubmit={this.handleSubmit}>
                                    <input className="title-preview" type="text" onChange={this.handleInput("title")} value={this.state.title} placeholder="Add a title that describes your video"/>
                                    <label className="title-label">Title (required)</label>
                                    <input className="description-preview" type="text" onChange={this.handleInput("description")} value={this.state.description} placeholder="Tell viewers about your video" />
                                   <label className="desc-label">Description </label>
                                </form>
                            </div>

                            <div className="video-preview">
                                <video className="preview-video" height="133" width="236" controls>
                                    <source src={this.state.videoUrl} />
                                </video>

                                <div className="filename-container">
                                    <p className="filename-text">Filename</p>
                                    <p className="filename-title">{file}</p>
                                </div>
                            </div>
                        </div>
                        <button id="video-submit-bttn" onClick={this.handleSubmit}>{this.props.formType}</button>
                    </div>
                </>
           ) 
        } else {
                return (
                    <div className="modal-div">
                        <div className="form-title">
                            <p className="form-header"> Upload Videos</p>
                            <IoIcons.IoMdClose className="cross-icon" onClick={this.props.closeModal} />
                        </div>
                        <hr />
                        <div className="upload-file"
                            onDrop={this.handleDrop}
                            onDragEnter={this.handleDragEnter}
                            onDragOver={this.handleDragOver} >
                            <label>
                                <input className="upload-icon-input" type="file" accept="video/*" onClick={this.handleFile} />
                                <MdIcons.MdFileUpload className="upload-icon" />
                            </label>
                            <p className="top-text">Drag and drop video files to upload</p>
                            <p className="bttm-text">Your videos will be private until you publish them.</p>
                            <label>
                                <input className="select-input" type="file" onChange={this.handleFile} />
                                <span className="select-label">SELECT FILE</span>
                            </label>
                        </div>
                    </div >

                )
            }
       }
}

export default UploadForm;