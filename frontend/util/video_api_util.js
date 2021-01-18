//fetches all the videos in the db
export const fetchVideos = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/videos'
    })
}

//fetches a single video
export const fetchVideo = (videoId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/videos/${videoId}`
    })
}

//creates a new video
export const createVideo = (video) => {
    return $.ajax({
        method: 'POST',
        url: '/api/videos/',
        //remove {} because it will be an object already
        data: video,
        contentType: false,
        processData: false
    })
}

//updates an existing video inn the db
export const updateVideo = (video) => {
    return $.ajax({
        method: 'PATCH',
        url: '/api/videos/${video.id}',
        data: { video }
    })
}

//removes a video from the db
export const deleteVideo = (videoId) => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/videos/${videoId}`
    })
}