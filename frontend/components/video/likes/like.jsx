import React from 'react';
import { Link } from 'react-router-dom';
import * as IoIcons from 'react-icons/io';
import * as likeFunctions from '../../../util/like_functions';
class Like extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            oldLike: null,
            likes: null,
            dislikePopUp: false,
            LikePopUp: false
        }
        this.likeVideo = this.likeVideo.bind(this);
        this.dislikeVideo = this.dislikeVideo.bind(this);
        this.likeSetter = this.likeSetter.bind(this);
        this.setOldLike = this.setLike.bind(this);
        this.refreshLikeValues = this.refreshLikeValues.bind(this);
        this.hidePopUp = this.hidePopUp.bind(this);
        this.likeModal = React.createRef();
        this.dislikeModal = React.createRef();
    }

    componentDidMount(){
        this.props.fetchLikes("Video", this.props.video.id)
            .then(response => this.setState({ likes: response.likes })).then(this.setOldLike)
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.hidePopUp)
    }

    componentWillUnMount() {
        document.addEventListener('mousedown', this.hidePopUp)
    }

    refreshLikeValues(){
        this.props.fetchLikes("Video", this.props.video.id)
            .then(response => this.setState({ likes: response.likes })).then(this.setOldLike)
    }

    setOldLike(){
        if(this.props.currentUser){
            const currentUser =  this.props.currentUser
            var likedItems = {}
            currentUser.liked_items.forEach(like => {
                likedItems[like.id] = true
            })

            const likes = this.state.likes ? this.state.likes : {}
            var oldLike = Object.values(likes).filter(like => (
                like.liker_id === currentUser.id && likedItems[like.id] && like.likeable_type === "Video"
            ))
            this.setState({ oldLike: oldLike[0] })
        }
    }

    likeVideo(e){
        e.preventDefault;
        if(this.props.currentUser){
            const like = ({ value: 1, likeable_type: "Video", likeable_id: this.props.video.id})
            this.likeSetter(like);
        }else{
            this.setState({ dislikePopUp: false, LikePopUp: !this.state.LikePopUp })
            (document.getElementById('like-sign-in-popup').focus())
        }
    }

    dislikeVideo(e) {
        e.preventDefault;
        if (this.props.currentUser) {
            const like = ({ value: -1, likeable_type: "Video", likeable_id: this.props.video.id })
            this.likeSetter(like);
        } else {
            this.setState({ dislikePopUp: false, LikePopUp: !this.state.LikePopUp })
                (document.getElementById('dislike-sign-in-popup').focus())
        }
    }

    hidePopUp(e){
        if(!this.likeModal.current.contains(e.target) && this.state.LikePopUp){
            this.setState({ LikePopUp: false })
        } else if(!this.dislikeModal.current.contains(e.target) && this.state.dislikePopUp){
            this.setState({ dislikePopUp: false})
        }
    }

    displayLIkeSignInPopup(){
        return(
            <div id="like-sign-in-popup">
                <div id="you-like">
                    Like this video?
                </div>

                <div>
                    Sign in to make your opinion count.
                </div>

                <div className="sign-in">
                    <Link className="home" to="/login"> <BsIcons.BsFillPersonFill className="humanIcon" /> Sign in</Link>;
                </div>

            </div>
        )
    }

    likeSetter(newLike){
        const oldLike = this.state.oldLike;

        if(oldLike && newLike.liked_value === oldLike.liked_value){
            if(oldLike.id){
                this.props.deleteLike(oldLike).then(delete(this.state.likes[oldLike.id])).then(this.setState({ oldLike: null}))
            }else{
                this.setState({ oldLike: null})
            }
        }else if (oldLike){
            var updateLike = oldLike;
            updateLike.liked_value = -updateLike.liked_value;

            this.props.updateLike(oldLike)
        }else{
            this.props.createLike(newLike).then(this.refreshLikeValues)
        }
    }

    render() {
        return (
            <div className="like-bar">
                <div>
                    <button id={(this.state.oldLike && this.state.oldLike.liked_value === 1) ? "like-selected" : "like"} onClick={this.likeVideo}>
                        <IoIcons.IoMdThumbsUp />
                        <div>
                            {likeFunctions.videoLikeValue(this.state.likes).upvotes}
                        </div>
                    </button>
                </div>

                <div id={this.state.LikePopUp ? "like-popup" : "popup-hidden"} ref={this.likeModal}>
                    <div>
                        Like this video?
                    </div>
                    <div>
                        Sign in to make your opinion count/
                    </div>

                    <div className="sign-in">
                        <Link className="home" to="/login"> <BsIcons.BsFillPersonFill className="humanIcon" /> Sign in</Link>;
                    </div>
                </div>

                <button id={(this.state.oldLike && this.state.oldLike.liked_value === -1) ? "dislike-selected" : "dislike"} onClick={this.dislikeVideo}>
                    <IoIcons.IoMdThumbsDown />
                    <div>
                        {-(likeFunctions.videoLikeValue(this.state.likes).downvotes)}
                    </div>
                </button>
                <div id={this.state.dislikePopUp ? "dislike-popup" : "popup-hidden"} ref={this.dislikeModal}>
                    <div>
                        Don't like this video?
                    </div>
                    <div>
                        Sign in to make your opinion count/
                    </div>

                    <div className="sign-in">
                        <Link className="home" to="/login"> <BsIcons.BsFillPersonFill className="humanIcon" /> Sign in</Link>;
                    </div>
                </div>
                <div className="sentiment-bar">
                    <div className={this.state.oldLike ? "like-bar-liked" : "like-bar"}
                        style={{width:(likeFunctions.videoLikeValue(this.state.likes).totalLikes === 0 ? "50%" : ((likeFunctions.videoLikeValue(this.state.likes).upvotes / likeFunctions.videoLikeValue(this.state.likes).totalLikes) * 100 ) + "%") }} >

                        </div>
                </div>
            </div>
        )
    }
}

export default Like;