//likes the video
export  const likeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/like`
    }))
}

//removes the like from a video
export const unlikeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/unlike`
    }))
}

//adds a dislike for a video
export const dislikeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/dislike`
    }))
}

//removes the dislike from a video
export const undislikeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/undislike`
    }))
}

//keeps track of the current liked status of the video
export const changeLikeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/changelike`
    }))
}