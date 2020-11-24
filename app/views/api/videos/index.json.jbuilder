@videos.each do |video|
    json.set! video.id do
        json.extract! video, :id, :title, :description, :uploader_id, :created_at
        json.videoUrl url_for(video.video)
    end
end