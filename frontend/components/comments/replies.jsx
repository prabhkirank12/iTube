import React from 'react';
import CommentIndexItemContainer from './comment_index_item_container';

class Replies extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    componentDidMount() {
        this.handleClose();
    }

    handleClose(){
        this.setState({
            open: false
        })
    }

    handleOpen(){
        this.setState({
            open: true
        })
    }

    render() {
        let comments = Object.values(this.props.comments).reverse();
        let replies = [];
        comments.map(comment => {
            if (this.props.parent.repliesIds.includes(comment.id)) replies.push(<CommentIndexItemContainer key={comment.id} comment={comment} />)
        })

        if (replies.length >= 0) {
            let repliesText = '';
            if(replies.length === 0) {
                repliesText = '';
            } else if (replies.length === 1){
                repliesText = '1 reply';
            } else if (replies.length > 1){
                repliesText = `${replies.length} replys`;
            }

            let repliesBttn = '';
            if (this.state.open){
                repliesBttn = <button type="button" onClick={this.handleClose}>Hide {repliesText}</button>
            } else {
                repliesBttn = <button type="button" onClick={this.handleOpen}>View {repliesText}</button>
            }

            let allReplies = '';
            if (this.state.open) {
                allReplies = <div id='replies-list' className='replies-list'>
                    {replies}
                </div>
            }
            return(
                <div id='reply-list-container'>
                    {repliesBttn}
                    {allReplies}
                </div>
            )    
        } else {
            return null
        }
    }
}

export default Replies;