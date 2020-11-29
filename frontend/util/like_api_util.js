// export const fetchLikes = (likeable_type, likeable_id) => {
//     return $.ajax({
//         method: 'POST',
//         url: `/api/${likeable_type.toLowerCase()}s/${likeable_id}/likes`
//     })
// }

// export const createLike = ({id, liked_value, likeable_type, likeable_id}) => {
//     return $.ajax({
//         method: 'POST',
//         url: `/api/${likeable_type.toLowerCase()}s/likes/${id}`,
//         data: {liked_value, likeable_id, likeable_type}
//     })
// }

// export const updateLike = ({ id, liked_value, likeable_type, likeable_id }) => {
//     return $.ajax({
//         method: 'PATCH',
//         url: `/api/${likeable_type.toLowerCase()}s/likes/${id}`,
//         data: { liked_value, likeable_id, likeable_type }
//     })
// }


// export const deleteLike = (like) => {
//     return $.ajax({
//         method: 'DELETE',
//         url: `/api/${ likeable_type.toLowerCase() }s/likes/${like.id}`
//     })
// }

export  const likeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/like`
    }))
}

export const unlikeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/unlike`
    }))
}

export const dislikeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/dislike`
    }))
}

export const undislikeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/undislike`
    }))
}

export const changeLikeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/changelike`
    }))
}