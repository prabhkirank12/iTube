import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import * as IoIcons from 'react-icons/io';
import NavBar from '../../components/nav_bar/nav_bar_container';
import { formatDate } from '../../util/format_date_util';
import VideoNext from './video_next'
class VideoShow extends React.Component {
    constructor(props){
        super(props);

        this.handleLikeVideo = this.handleLikeVideo.bind(this);
        this.handleUnlikeVideo = this.handleUnlikeVideo.bind(this);
        this.handleDislikeVideo = this.handleDislikeVideo.bind(this);
        this.handleUndislikeVideo = this.handleUndislikeVideo.bind(this);
        this.handleChangeLikeVideo = this.handleChangeLikeVideo.bind(this);
        this.handleLikeChange = this.handleLikeChange.bind(this);
        this.handleRedirectToLogin = this.handleRedirectToLogin.bind(this);
        this.handleDeleteVideo = this.handleDeleteVideo.bind(this);
    }

    componentDidMount(){
        this.props.fetchVideo(this.props.video.id);
        this.props.fetchVideos();
    }

    componentDidUpdate(){
        if (document.getElementById("like-bttn") && document.getElementById("dislike-bttn")) {
            this.handleLikeChange();
        }
    }

    //gets the total number of likes on a video
    getLikeProportion(){
        let numLikes = this.props.video.likerIds.length;
        let totalNum = this.props.video.likerIds.length + this.props.video.dislikerIds.length;
        let result = (numLikes / totalNum) * 100;
        if (result === NaN){
            return '50%';
        }else{
            return `${result}%`;
        }
    }

    //gets the total number of dislikes on a video
    getDislikeProportion() {
        let numDislikes = this.props.video.dislikerIds.length;
        let totalNum = this.props.video.likerIds.length + this.props.video.dislikerIds.length;
        let result = (numDislikes / totalNum) * 100;
        if (result === NaN) {
            return '50%';
        } else {
            return `${result}%`;
        }
    }

    handleRedirectToLogin() {
        this.props.history.push('/login');
    }

    handleLikeVideo(){
        this.props.likeVideo(this.props.video.id);
    }

    handleUnlikeVideo(){
        this.props.unlikeVideo(this.props.video.id);
    }

    handleDislikeVideo() {
        this.props.dislikeVideo(this.props.video.id);
    }

    handleUndislikeVideo() {
        this.props.undislikeVideo(this.props.video.id);
    }

    handleChangeLikeVideo(){
        this.props.changeLikeVideo(this.props.video.id);
    }

    //allows the uploader to delete their video
    handleDeleteVideo(){
        this.props.removeVideo(this.props.video.id);
        this.props.history.push('/');
    }

    handleLikeChange(){
        let likeBttn = document.getElementById("like-bttn");
        let dislikeBttn = document.getElementById("dislike-bttn");
        let likeBar = document.getElementById("like-bar");

        if(this.props.video.likerIds.includes(this.props.currentUser.id)){
            likeBttn.classList.add("like-selected");
            dislikeBttn.classList.remove("like-selected");
            likeBar.classList.add("like-selected");
        } else if (this.props.video.dislikerIds.includes(this.props.currentUser.id)) {
            likeBttn.classList.remove("like-selected");
            dislikeBttn.classList.add("like-selected");
            likeBar.classList.add("like-selected");
        } else {
            likeBttn.classList.remove("like-selected");
            dislikeBttn.classList.remove("like-selected");
            likeBar.classList.remove("like-selected");
        }
    }

    render() {

        //setting the like and dislike buttons
        let likeBttn = '';
        let dislikeBttn = '';
        if(!this.props.currentUser){
            likeBttn = <button onClick={this.handleRedirectToLogin} id="like-bttn"><IoIcons.IoMdThumbsUp />{this.props.video.likerIds.length}</button>
            dislikeBttn = <button onClick={this.handleRedirectToLogin} id="dislike-bttn"><IoIcons.IoMdThumbsDown />{this.props.video.dislikerIds.length}</button>
        }else if(this.props.video.likerIds.includes(this.props.currentUser.id)){
            likeBttn = <button onClick={this.handleUnlikeVideo} id="like-bttn"><IoIcons.IoMdThumbsUp />{this.props.video.likerIds.length}</button>
            dislikeBttn = <button onClick={this.handleChangeLikeVideo} id="dislike-bttn"><IoIcons.IoMdThumbsDown />{this.props.video.dislikerIds.length}</button>
        } else if (this.props.video.dislikerIds.includes(this.props.currentUser.id)) {
            likeBttn = <button onClick={this.handleChangeLikeVideo} id="like-bttn"><IoIcons.IoMdThumbsUp />{this.props.video.likerIds.length}</button>
            dislikeBttn = <button onClick={this.handleUndislikeVideo} id="dislike-bttn"><IoIcons.IoMdThumbsDown />{this.props.video.dislikerIds.length}</button>
        }else{
            likeBttn = <button onClick={this.handleLikeVideo} id="like-bttn"><IoIcons.IoMdThumbsUp />{this.props.video.likerIds.length}</button>
            dislikeBttn = <button onClick={this.handleDislikeVideo} id="dislike-bttn"><IoIcons.IoMdThumbsDown />{this.props.video.dislikerIds.length}</button>  
        }

        let likeBarStyle = '';
        let dislikeBarStyle = '';
        if (this.props.video){
            likeBarStyle = {
                width: this.getLikeProportion()
            }
            dislikeBarStyle = {
                width: this.getDislikeProportion()
            }
        }

        //setting the edit and remove button for current user
        let videoUploader = (this.props.video.uploader_id === this.props.currentUser.id)
        let editDeleteBttn = '';
        if (videoUploader) {
            editDeleteBttn = <div id="video-options-bttns">
                <button onClick={this.props.openEditModal} id="edit-bttn">EDIT</button>
                <button onClick={this.handleDeleteVideo} id="delete-bttn">REMOVE</button>
            </div>
        }
        if (this.props.video){
            let videos = Object.values(this.props.videos).map(video => {
                return (
                    <VideoNext video={video} key={video.id} history={this.props.history} />
                )
            })
            return (
                <div>
                <NavBar />
                    <div className="video-show">
                        <video width="800" height="400" autoPlay controls className="video-display">
                            <source src={this.props.video.videoUrl} type="video/mp4" />
                        </video>

                    </div>
                   <div className="video-content-show">
                       <div className="video-title-show">
                           {this.props.video.title}
                       </div>

                        <div id="video-show-buttons">
                            <div id="like-dislike-bar-container">
                                <div id="like-bar" style={likeBarStyle}></div>
                                <div id="dislike-bar" style={dislikeBarStyle}></div>
                            </div>
                            <p>
                                {formatDate(this.props.video.created_at)}
                            </p>
                            {likeBttn}
                            {dislikeBttn}
                            {editDeleteBttn}
                            <button> <IoIcons.IoIosShareAlt /> Share </button>
                        </div>

                        <div className="video-desc-show">
                            <hr />
                            <button className="logo-icon"></button>
                            <p className="show-desc">
                                {this.props.video.description}
                            </p>
                        </div>

                   </div>

                   {/* <div className="all-videos">
                        {videos}
                   </div> */}
               </div>   
           )
       }else{
           return(
               <>
                <NavBar />
                <h1>No video here</h1>
               </>
           )
       }
    }
}

export default withRouter(VideoShow);
