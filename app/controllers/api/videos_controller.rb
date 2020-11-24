class Api::VideosController < ApplicationController
    def show
        @video = Video.find_by(id: params[:id])
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
        if params[:userId]
            @videos = User.find_by(id: parmas[:userId]).video
        else
            @videos = Video.all
        end
        # @videos = Video.all.includes(:uploader)
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

    private
    def video_params
        params.require(:video).permit(:title, :description, :video)
    end
end