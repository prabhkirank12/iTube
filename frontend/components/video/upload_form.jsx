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

        return (
            <>
                <form onSubmit={this.handleSubmit} className="upload-video-form">
                    <div className="video-form-header">
                        <h2>{this.state.title}</h2>
                        <IoIcons.IoMdClose className="crossIcon" onClick={this.props.closeModal} />
                    </div>
                        
                    {(this.state.videoFile || this.state.videoUrl) ? (
                        <div className="info-section">
                            <div className="info-container column">
                                <h1>Details</h1>
                                <label className="title-field">Title (required)
                                    <input type="text" value = {title} onChange={this.handleInput("title")} placeholder="Add a title that describes your video" />
                                </label>

                                <label className="desc-field">Description 
                                    <textarea value={description} onChange={this.handleInput("description")} placeholder="Tell viewers about your video"> </textarea>
                                </label>
                            </div>

                        </div>
                    ) : (
                        <div className="modal-div">
                            <div className="form -title">
                                <p className="form-header"> Upload Videos</p>
                                <IoIcons.IoMdClose className="cross-icon" onClick={this.props.closeModal} />
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
                                <p className="top-text">Drag and drop video files to upload</p>
                                <p className="bttm-text">Your videos will be private until you publish them.</p>
                                    {/* <label className="select-label"> 
                                        <input className="select-bttn-input" type="file" 
                                        accept=".mkv, .webm, .flv, .vob, .mng, .avi, .wmv, .qt, .mp4, .mpg, .m4v"
                                        onChange={this.handleFile} />
                                        {/* <button onClick={this.handleSubmit} className="select-bttn">Select Files</button> */}
                                    {/* </label> */} 
                                <label>
                                    <input type="file" onChange={this.handleFile}/>
                                    <span id="select-label">SELECT FILES</span>
                                </label>
                                {/* <button className="select-bttn" onClick={this.handleSubmit}>Submit</button> */}
                            </div>
                        </div >
                        )}
                </form>
                </>
            )

     }
}

export default UploadForm;