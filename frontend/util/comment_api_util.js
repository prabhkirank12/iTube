//gets all the comments
export const fetchComments = (videoId) => {
    return ($.ajax({
        method: "GET",
        url: `api/videos/${videoId}/comments`
    }))
}

//post a comment for a video
export const createComments = (videoId, comment) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/comments`,
        data: { comment }
    }))
}

//updates an existing comment
export const updateComment = (comment) => {
    return ($.ajax({
        method: "PATCH",
        url: `api/comments/${comment.id}`,
        data: { comment }
    }))
}

//removes a comment from a video
export const deleteComment = (commentId) => {
    return ($.ajax({
        method: "DELETE",
        url: `api/comments/${commentId}`
    }))
}

//creates a reply to a comment
export const createReply = (commentId, comment) => {
    return ($.ajax({
        method: "POST",
        url: `api/comments/${commentId}/comments`,
        data: { comment }
    }))
}

// receive all the replies
export const fetchReplies = (commentId) => {
    return ($.ajax({
        method: "GET",
        url: `api/comments/${commentId}/comments`
    }))
}