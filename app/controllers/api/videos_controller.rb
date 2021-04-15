class Api::VideosController < ApplicationController
    def show
        @video = Video.find(params[:id])
        render :show
    end

    def create
        @video = Video.new(video_params)
        @video.uploader_id = current_user.id
        if @video.save
            render :show
        else
            render json: @video.errors.full_messages, status: 422
        end
    end

    def index
        if params[:query]
            @videos = Video.search_video(params[:query])
        elsif params[:userId]
            @videos = User.find_by(id: parmas[:userId]).video
        else
            @videos = Video.all
        end
        render :index
    end

    def destroy
        @video = Video.find(params[:id])
        @video.destroy
    end

    def update
        @video = Video.find(params[:id])

        if @video.update_attributes(video_params)
            render :show
        else
            render json: @vidoe.errors.full_messages, status: 422
        end
    end

    def like 
        @like = Like.new(liked_value: 1, liker_id: current_user.id, likeable_id: params[:video_id], likeable_type: "Video")
        if @like.save
            redirect_to api_video_url(params[:video_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end
    
    def unlike 
        @like = Like.find_by(liked_value: 1, liker_id: current_user.id, likeable_id: params[:video_id], likeable_type: "Video")
        if @like.destroy
            redirect_to api_video_url(params[:video_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def dislike 
        @like = Like.new(liked_value: -1, liker_id: current_user.id, likeable_id: params[:video_id], likeable_type: "Video")
        if @like.save
            redirect_to api_video_url(params[:video_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end


    def undislike 
        @like = Like.find_by(liked_value: -1, liker_id: current_user.id, likeable_id: params[:video_id], likeable_type: "Video")
        if @like.destroy
            redirect_to api_video_url(params[:video_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def change_like
        @like = Like.find_by(liker_id: current_user.id, likeable_id: params[:video_id], likeable_type: "Video")
        if (@like.liked_value === 1)
            @like.liked_value = -1
        else
            @like.liked_value = 1
        end

        if @like.save
            redirect_to api_video_url(params[:video_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    private
    def video_params
        params.require(:video).permit(:title, :description, :video)
    end
end