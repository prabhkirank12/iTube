import React from 'react';
import { Link } from 'react-router-dom';
import EditCommentContainer from "./edit_comment_container";
import CommentFormContainer from "./comment_form_container";
import { timeSinceUpload } from '../../util/format_date_util';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';

// reply container

class CommentIndexItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            repliesCount: 0
        };

        this.handleLikeChange = this.handleLikeChange.bind(this);
        this.handleRedirectToLogin = this.handleRedirectToLogin.bind(this);
        // this.handlePopup = this.handlePopup.bind(this);
        this.handleLikeComment = this.handleLikeComment.bind(this);
        this.handleDislikeComment = this.handleDislikeComment.bind(this);
        this.handleUnlikeComment = this.handleUnlikeComment.bind(this);
        this.handleUndislikeComment = this.handleUndislikeComment.bind(this);
        this.handleChangeLikeComment = this.handleChangeLikeComment.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    componentDidMount() {
        if (!this.props.commenter) this.props.fetchUser(this.props.comment.commenterId);
        // this.handlePopup = this.hanndlePopup.bind(this);
        if(document.getElementById(`comment-like-bttn-${this.props.comment.id}`) && document.getElementById(`comment-dislike-bttnn-${this.props.comment.id}`)) {
            this.handleLikeChange();
        }
    }

    componentDidUpdate() {
        if(document.getElementsByClassName("inline-comment-form")[0]) {
            if (document.getElementsByClassName("inline-comment-input")[0].value.length > 0) {
                if (!document.getElementsByClassName("inline-comment-bttns")[0]){
                    this.setState({
                        editMode: false
                    })
                }
            }
        }
        if (document.getElementById(`comment-like-bttn-${this.props.comment.id}`) && document.getElementById(`comment-dislike-bttnn-${this.props.comment.id}`)) {
            this.handleLikeChange();
        }
    }

    handleLikeChange() {
        let likeBttn = document.getElementById(`comment-like-bttn`);
        let dislikeBttn = document.getElementById(`comment-dislike-bttn`);
        if (this.props.comment.likerIds.includes(this.props.currentuserId)) {
            likeBttn.classList.add("like-selected");
            dislikeBttn.classList.remove("like-selected");
        } else if (this.props.comment.dislikerIds.includes(this.props.currentuserId)) {
            likeBttn.classList.remove("like-selected");
            dislikeBttn.classList.add("like-selected");
        } else {
            likeBttn.classList.remove("like-selected");
            dislikeBttn.classList.remove("like-selected");
        }
    }

    handleRedirectToLogin(){
        this.props.history.push('/login');
    }

    handleLikeComment() {
        this.props.likeComment(this.props.comment.id);
    }

    handleUnlikeComment() {
        this.props.unlikeComment(this.props.comment.id);
    }

    handleDislikeComment() {
        this.props.dislikeComment(this.props.comment.id);
    }

    handleUndislikeComment() {
        this.props.undislikeComment(this.props.comment.id);
    }

    handleChangeLikeComment() {
        this.props.changeLikeComment(this.props.comment.id);
    }

    handleEdit() {
        this.setState({
            editMode: true,
        })
    }

    handleDelete() {
        if (this.props.comment.parentId) {
            this.props.deleteReply(this.props.comment);
        } else {
            this.props.deleteComment(this.props.comment.id);
        }
    }


    render() {
        if (!this.props.commenter) {
            return null
        } else {
            // if current user if the commenter then give the option to 
            //  edit or delete comment
            let commenterBttns = '';
            if (this.props.currentuserId === this.props.commenter.id) {
                commenterBttns = <div className="comment-options-popup hide">
                    <button onClick={this.handleEdit}><RiIcons.RiPencilFill />Edit</button>
                    <button onClick={this.handleDelete}><IoIcons.IoMdTrash />Delete</button>
                </div>
            } 

            // if user edits the comment, it will show edited next to usernname
            let edited = '';
            if (this.props.comment.isEdited) {
                edited = <p>(edited)</p>
            }

            // like and dislike button for the commennts
            let likeBttn = '';
            let dislikeBttn = '';
            if (!this.props.currentuserId) {
                likeBttn = <button onClick={this.handleRedirectToLogin} className="comment-like-bttn"><IoIcons.IoMdThumbsUp /><p>{this.props.comment.likerIds.length}</p></button>
                dislikeBttn = <button onClick={this.handleRedirectToLogin} className="comment-dislike-bttn"><IoIcons.IoMdThumbsDown /><p>{this.props.comment.dislikerIds.length}</p></button>
            } else if ( this.props.comment.likerIds.includes(this.props.currentuserId)) {
                likeBttn = <button onClick={this.handleUnlikeComment} className="comment-like-bttn"><IoIcons.IoMdThumbsUp /><p>{this.props.comment.likerIds.length}</p></button>
                dislikeBttn = <button onClick={this.handleChangeLikeComment} className="comment-dislike-bttn"><IoIcons.IoMdThumbsDown /></button>
            } else if ( this.props.comment.dislikerIds.includes(this.props.currentuserId)) {
                likeBttn = <button onClick={this.handleChangeLikeComment} className="comment-like-bttn"><IoIcons.IoMdThumbsUp /><p>{this.props.comment.likerIds.length}</p></button>
                dislikeBttn = <button onClick={this.handleUndislikeComment} className="comment-dislike-bttn"><IoIcons.IoMdThumbsDown /></button>
            } else {
                likeBttn = <button onClick={this.handleLikeComment} className="comment-like-bttn"><IoIcons.IoMdThumbsUp /><p>{this.props.comment.likerIds.length}</p></button>
                dislikeBttn = <button onClick={this.handleDislikeComment} className="comment-dislike-bttn"><IoIcons.IoMdThumbsDown /></button>
            }

            if (this.state.editMode) {
                return (
                    <div key={this.props.comment} className="comment-item-container">
                        <div>
                            <Link to="/" className="commenter">
                                {this.props.commenter.first_name}
                            </Link>
                            <EditCommentContainer comment={this.props.comment} />
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={this.props.comment} className="comment-item-container">
                        <div>
                            <Link to="/" className="commenter">
                                {this.props.commenter.first_name}
                            </Link>
                            <div>
                                <Link className="commenter-time" to="/">{this.props.commenter.first_name} <span className="time-span">{timeSinceUpload(this.props.comment.createdAt)}</span> {edited} </Link>
                                <p className="comment-content">{this.props.comment.content}</p>
                                <div className="likes-section">
                                    {likeBttn}
                                    {dislikeBttn}
                                    Reply
                                    {/* reply bttn goes here */}
                                </div>
                                {/* reply section goes here */}
                            </div>
                        </div>
                        {commenterBttns}
                    </div>
                )
            }

        }
    }

}

export default CommentIndexItem;