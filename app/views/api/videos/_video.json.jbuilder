json.extract! video, :id, :title, :description, :uploader_id, :created_at
json.videoUrl url_for(video.video)
json.likerIds video.likers
json.dislikerIds video.dislikers 