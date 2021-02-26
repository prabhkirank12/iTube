class Api::CommentsController < ApplicationController
    def show
        @comment = Comment.find(params[:id])
    end

    def create
        @comment = Comment.new(comment_params)
        if params[:video_id]
            @comment.video_id = params[:video_id]
        else
            @comment.parent_comment_id = params[:comment_id]
            parentComment = Comment.finnd(params[:comment_id])
            @comment.video_id = parentComment.video_id
        end

        @comment.commenter_id = current_user.id
        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def index
        if params[:video_id]
            @comments = Comment.where(video_id: params[:video_id]).includes(:commenter)
        elsif params[:comment_id]
            @comments = Comment.where(parent_comment_id: params[:comment_id]).includes(:commenter)
        else
            @comments = Comment.all
        end
        render :index
    end

    def destroy
        @comment = Comment.find_by(id: params[:id])
        if @comment && current_user.id == @comment.commenter_id
            @comment.destroy!
        end
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