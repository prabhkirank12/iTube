import React from 'react';
import { Link, Route } from 'react-router-dom';
import * as IoIcons from 'react-icons/io';
import NavBar from '../../components/nav_bar/nav_bar_container';
// import Like from './likes/like_container';
import { formatDate } from '../../util/format_date_util';
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
    }

    componentDidMount(){
        this.props.fetchVideo(this.props.video.id);
        this.props.fetchVideos();
    }

    componentDidUpdate(){
        if (document.getElementById("like-btn") && document.getElementById("dislike-btn")){
            this.handleLikeChange();
        }
    }

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

    handleLikeChange() {
        let likeBtn = document.getElementById("like-btn");
        let dislikeBtn = document.getElementById("dislike-btn");
        let likeBar = document.getElementById("like-bar");

        if(this.props.video.likerIds.includes(this.props.currentUser.id)){
            likeBtn.classList.add("like-selected");
            dislikeBtn.classList.remove("like-selected");
            likeBar.classList.add("like-selected");
        } else if (this.props.video.dislikerIds.includes(this.props.currentUser.id)){
            likeBtn.classList.remove("like-selected");
            dislikeBtn.classList.add("like-selected");
            likeBar.classList.add("like-selected");
        }else{
            likeBtn.classList.remove("like-selected");
            dislikeBtn.classList.remove("like-selected");
            likeBar.classList.remove("like-selected");
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

    render() {
        let likeBtn = '';
        let dislikeBtn = '';
        if(!this.props.currentUser){
            likeBtn = <button onClick={this.handleRedirectToLogin} id="like-btn"><IoIcons.IoMdThumbsUp />{this.props.video.likerIds.length}</button>
            dislikeBtn = <button onClick={this.handleRedirectToLogin} id="like-btn"><IoIcons.IoMdThumbsDown />{this.props.video.dislikerIds.length}</button>
        }else if(this.props.video.likerIds.includes(this.props.currentUser.id)){
            likeBtn = <button onClick={this.handleUnlikeVideo} id="like-btn"><IoIcons.IoMdThumbsUp />{this.props.video.likerIds.length}</button>
            dislikeBtn = <button onClick={this.handleChangeLikeVideo} id="like-btn"><IoIcons.IoMdThumbsDown />{this.props.video.dislikerIds.length}</button>
        } else if (this.props.video.likerIds.includes(this.props.currentUser.id)) {
            likeBtn = <button onClick={this.handleChangeLikeVideo} id="like-btn"><IoIcons.IoMdThumbsUp />{this.props.video.likerIds.length}</button>
            dislikeBtn = <button onClick={this.handleUndislikeVideo} id="like-btn"><IoIcons.IoMdThumbsDown />{this.props.video.dislikerIds.length}</button>
        }else{
            likeBtn = <button onClick={this.handleLikeVideo} id="like-btn"><IoIcons.IoMdThumbsUp />{this.props.video.likerIds.length}</button>
            dislikeBtn = <button onClick={this.handleDislikeVideo} id="like-btn"><IoIcons.IoMdThumbsDown />{this.props.video.dislikerIds.length}</button>  
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

        if (this.props.video){
            return (
                <div>
                <NavBar />
                    <div className="video-show">
                        <video width="800" height="400" autoPlay controls>
                            <source src={this.props.video.videoUrl} type="video/mp4" />
                        </video>

                    </div>
                   <div className="video-content">
                       <div className="video-title">
                           {this.props.video.title}
                           {this.props.video.description}
                       </div>

                       {formatDate(this.props.video.created_at)}
                       {/* {/* <Like video={this.props.video} /> */} 
                        <div id="video-show-buttons">
                            <div id="like-dislike-bar-container">
                                <div id="like-bar" style={likeBarStyle}></div>
                                <div id="dislike-bar" style={dislikeBarStyle}></div>
                            </div>
                            {likeBtn}
                            {dislikeBtn}
                        </div>

                   </div>
                   <Link to="/">Back</Link>
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

export default VideoShow;
