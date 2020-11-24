import * as VideoUtil from "../util/video_api_util";
export const RECEIVE_VIDEO = "RECEIVE_VIDEO";
export const RECEIVE_ALL_VIDEOS = "RECEIVE_ALL_VIDEOS";
export const REMOVE_VIDEO = "REMOVE_VIDEO";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveVideo = (video) => {
    return{
        type: RECEIVE_VIDEO,
        video
    }
}

const receiveAllVideos = (videos) => {
    return {
        type: RECEIVE_ALL_VIDEOS,
        videos
    }
}

const receiveErrors = (errors) => {
    return {
        type: RECEIVE_ERRORS,
        errors
    }
}

const removeVideo = (videoId) => {
    return{
        type: REMOVE_VIDEO,
        videoId
    }
}

export const fetchVideo = videoId => dispatch => (
    VideoUtil.fetchVideo(videoId)
        .then(video => dispatch(receiveVideo(video)), err => receiveErrors(err))
)

export const fetchVideos = () => dispatch => (
    VideoUtil.fetchVideos()
        .then(videos => dispatch(receiveAllVideos(videos)), err => receiveErrors(err))
)

export const deleteVideo = videoId => dispatch => (
    VideoUtil.deleteVideo(videoId)
        .then(() => dispatch(removeVideo(videoId)), err => receiveErrors(err))
)

export const updatVideo = video => dispatch (
    VideoUtil.updateVideo(video)
        .then(video => dispatch(receiveVideo(video)), err => receiveErrors(err))
)

export const uploadVideo = video => dispatch => (
    VideoUtil.createVideo(video)
        .then(video => dispatch(receiveVideo(video)), err => receiveErrors(err))
)