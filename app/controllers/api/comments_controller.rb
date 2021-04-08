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
            parentComment = Comment.find(params[:comment_id])
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
            main_comments = Video.find(params[:video_id]).comments
            @comments = main_comments
            main_comments.each{ |comment| @comments.concat(comment.replies)}
        else
            @comments = Comment.find(params[:comment_id]).replies
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
        @comment = Comment.find(params[:id])
        if @comment.content != comment_params[:content]
            if @comment.update(comment_params)
                render :show
            else
                render json: @comment.errors.full_messages, status: 422
            end
        else
           render :show
        end
    end

    def like 
        @like = Like.new(liked_value: 1, liker_id: current_user.id, likeable_id: params[:comment_id], likeable_type: "Comment")
        if @like.save
            redirect_to api_comment_url(params[:comment_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end
    
    def unlike 
        @like = Like.find_by(liked_value: 1, liker_id: current_user.id, likeable_id: params[:comment_id], likeable_type: "Comment")
        if @like.destroy
            redirect_to api_comment_url(params[:comment_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def dislike 
        @like = Like.new(liked_value: -1, liker_id: current_user.id, likeable_id: params[:comment_id], likeable_type: "Comment")
        if @like.save
            redirect_to api_comment_url(params[:comment_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end


    def undislike 
        @like = Like.find_by(liked_value: -1, liker_id: current_user.id, likeable_id: params[:comment_id], likeable_type: "Comment")
        if @like.destroy
            redirect_to api_comment_url(params[:comment_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def change_like
        @like = Like.find_by(liker_id: current_user.id, likeable_id: params[:comment_id], likeable_type: "Comment")
        if (@like.liked_value === 1)
            @like.liked_value = -1
        else
            @like.liked_value = 1
        end

        if @like.save
            redirect_to api_comment_url(params[:comment_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    private
    def comment_params
        params.require(:comment).permit(:content, :video_id)
    end
end