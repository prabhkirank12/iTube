json.video do 
    json.extract! video, :id, :title, :description, :uploader_id, :created_at
    json.videoLink url_for(video.video)
end