import React from 'react';
import { Link } from 'react-router-dom';
import EditCommentContainer from "./edit_comment_container";
import CommentFormContainer from "./comment_form_container";
import { timeSinceUpload } from '../../util/format_date_util';
import RepliesContainer from './replies_container';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

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
        this.handleLikeComment = this.handleLikeComment.bind(this);
        this.handleDislikeComment = this.handleDislikeComment.bind(this);
        this.handleUnlikeComment = this.handleUnlikeComment.bind(this);
        this.handleUndislikeComment = this.handleUndislikeComment.bind(this);
        this.handleChangeLikeComment = this.handleChangeLikeComment.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    componentDidMount() {
        this.props.fetchUser(this.props.comment.commenterId);
        if(document.getElementById(`comment-like-bttn`) && document.getElementById(`comment-dislike-bttn`)) {
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
        if (document.getElementById(`comment-like-bttn`) && document.getElementById(`comment-dislike-bttn`)) {
            this.handleLikeChange();
        }
    }

    handleRedirectToLogin(){
        <Link to="/login"></Link>
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

    handleOpenReplyForm() {
        document.getElementById('reply-comment-form').classList.add("show");
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

            // like and dislike button for the comments
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

            // Reply Section
            let replies = '';
            if (this.props.comment.repliesIds.length > 0) replies = <RepliesContainer parent={this.props.comment} />

            let replySection = '';
            let replyBttn = '';
            if (this.props.comment.parentId === null) {
                replySection = <>
                                <div id='reply-comment-form' className='reply-comment-form'>
                                    <CommentFormContainer handleUpdateAfterReply={this.handleUpdateAfterReply} parentId={this.props.comment.id}/> 
                                </div>
                                {replies}
                            </>
                replyBttn = <button id='reply-bttn' onClick={this.handleOpenReplyForm}>REPLY</button>
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
                            <div id="comment-details">
                                <Link className="commenter-time" to="/">{this.props.commenter.first_name} <span className="time-span">{timeSinceUpload(this.props.comment.createdAt)}</span> {edited} </Link>
                                <p className="comment-content">{this.props.comment.content}</p>
                                <div className="likes-section">
                                    {likeBttn}
                                    {dislikeBttn}
                                    {replyBttn}
                                </div>
                                {replySection}
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