import React from "react";
import CommentFormContainer from "./comment_form_container";
import CommentIndexItemContainer from "./comment_index_item_container";
import * as MdIcons from 'react-icons/md';

class CommentIndex extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            videoId: this.props.video.id,
            sortByNew: true
        };

        this.handleSortBy = this.handleSortBy.bind(this);
        this.handleVideoChange = this.handleVideoChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchComments(this.props.video.id);
    }

    componentDidUpdate() {
        if (this.state.videoId !== this.props.video.id) this.handleVideoChange();
    }

    handleVideoChange() {
        this.props.fetchComments(this.props.video.id);
        this.setState({
            videoId: this.props.video.id
        });
    }

    handleSortBy() {
        this.state.sortByNew ? this.setState({sortByNew: false}) : this.setState({sortByNew: true})
    }

    render() {
        // sets up the number count for comments and displays it
        let commentCount = '';
        let len = Object.values(this.props.comments).length;
        if(len === 0) {
            commentCount = <p>No comments yet</p>
        } else if (len === 1) {
            commentCount = <p>{ len } Comment</p>
        } else {
            commentCount = <p>{ len} Comments</p>
        }

        // displays all the comments and sorted by old or new
        let comments = Object.values(this.props.comments)
        // console.log(comments);
        // debugger;
        let sortBy = 'SORT BY: Oldest';

        if(this.state.sortByNew) {
            comments = Object.values(this.props.comments).reverse();
            sortBy = 'SORT BY: Newest'
        }

        comments = comments.map(comment => {
            if(comment.parentId === null) return <CommentIndexItemContainer key={comment.id} repliesIds={comment.repliesIds} comment={comment} />
        })

        return (
            <div className="comment-index-container">
                <header className="comment-index-header">
                    {commentCount}   
                    <MdIcons.MdSort onClick={this.handleSortBy} className="sort-icon"/>
                    <p className="sort-text">{sortBy}</p>
                </header>
                <CommentFormContainer videoId={this.props.video.id} />
                <div id="comment-index-items-container">
                    {comments}
                </div>
            </div>
        )
    }
}

export default CommentIndex;