import React from "react";
import { Link } from 'react-router-dom';

class CommentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            active: false,
        };

        this.handleEnterEdit = this.handleEnterEdit.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLeaveEdit = this.handleLeaveEdit.bind(this);
        this.hideButtons = this.hideButtons.bind(this);
        this.showButtons = this.showButtons.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if (this.props.formType === 'edit') this.handleEnterEdit();
    }

    componentDidUpdate() {
        if (this.props.videoId) {
            let submitBttn = document.getElementById("comment-submit-bttn");
            if (submitBttn) {
                if(this.state.content.length === 0){
                    submitBttn.setAttribute('disabled', '');
                } else {
                    submitBttn.removeAttribute('disabled', '');
                }
            }
        } else {
            let submitBttn = document.getElementById(`comment-submit-bttn-${this.props.parentId}`);
            if (submitBttn) {
                if(this.state.content.length === 0){
                    submitBttn.setAttribute('disabled', '');
                } else {
                    submitBttn.removeAttribute('disabled', '');
                }
            }
        }
    }

    redirectToLogin() {
        this.props.history.push("/login");
    }

    handleEnterEdit() {
        this.setState({
            content: this.props.comment.content,
            active: true
        })
    }

    showButtons() {
        this.setState({ active: true});
    }

    hideButtons() {
        if (this.props.videoId){
            this.setState({
                content: '',
                active: false
            });
        } else {
            this.setState({
                content: ''
            });
            document.getElementById(`reply-comment-${this.props.parentId}`).classList.remove("show");
        }
    }

    handleLeaveEdit() {
        this.setState({
            content: "loading...",
            active: false
        })
    }

    handleCancelEdit() {
        this.props.updateComment({ id: this.props.comment.id, content: this.props.comment.content });
        this.handleLeaveEdit();
    }

    handleSubmit() {
        if (this.props.formType === 'create') {
            if (this.props.videoId) {
                this.props.createComment(this.props.videoId, { content: this.state.content })
            } else {
                this.props.createReply(this.props.parentId, { content: this.state.content })
                if (this.props.handleReplyUpdate) this.props.handleReplyUpdate();
            }
            this.hideButtons();
        } else {
            this.props.updateComment({ id: this.props.comment.id, content: this.state.content });
            this.handleLeaveEdit();
        }    
    }

    handleInputChange(e) {
        this.setState({ content: e.target.value });
    }

    render() {
        if (this.props.formType === 'create') {
            let commenter = '';
            let inputAction = '';
            if (this.props.currentUser) {
                commenter = <Link to="/" className="commenter-icon">
                    {this.props.currentUser.first_name.toUpperCase()}
                </Link>
                inputAction = this.showButtons;
            } else {
                commenter= <Link to="/login" className="commenter-icon"></Link>
                inputAction = this.redirectToLogin;
            }

            let commentSubmitBttn = "comment-submit-bttn";
            if (this.props.parentId) commentSubmitBttn = `comment-submit-bttn-${this.props.parentId}`;

            let bttnDiv = '';
            if(this.state.active) {
                bttnDiv = <div id="comment-bttn-div">
                    <button type="button" onClick={this.hideButtons} id="comment-cancel-bttn">CANCEL</button>
                    <button type="button" onClick={this.handleSubmit} id={commentSubmitBttn}>COMMENT</button>
                </div>
            }

            return (
                <div id="comment-container">
                    <div id="comment-input-icon">
                        {commenter}
                        <div>
                            <input type="text" onClick={inputAction} onChange={this.handleInputChange} value={this.state.content} placeholder="Add a public comment..." required/>
                            <div id="comment-input-underline"></div>
                        </div>
                    </div>
                    {bttnDiv}
                </div>
            )
        } else {
            let commentSubmitBttn = "comment-submit-bttn";
            if (this.props.parentId) commentSubmitBttn = `comment-submit-bttn-${this.props.parentId}`;

            let buttonDiv = '';
            if (this.state.active) {
                 buttonDiv = <div id="comment-bttn-div" className="inline-comment-bttn">
                    <button type="button" onClick={this.handleCancelEdit} id="comment-cancel-bttn">CANCEL</button>
                    <button type="button" onClick={this.handleSubmit} id={commentSubmitBttn}>COMMENT</button>
                </div>
            }
            return (
                <div id="comment-container" className="inline-comment-bttn">
                    <div id="comment-input-icon">
                        {commenter}
                        <div>
                            <input type="text" className="inline-comment" onChange={this.handleInputChange} value={this.state.content} placeholder="Add a public comment..." required/>
                            <div id="comment-input-underline"></div>
                        </div>
                    </div>
                    {bttnDiv}
                </div>
            )
        }
    }
};

export default CommentForm;