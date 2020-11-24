class Api::LikesController < ApplicationController

    def index 
        @likes = Like.all
        render :index
    end
    def create
        @like = Like.new(like_params)
        @like.liker_id = current_user.id 
        if @like.save
            render :show
        else
            render json: @like.errors.full_messages, status: 422
        end
    end

    def update
        @like = Like.find_by(id: params[:id])
        @like.liked_value = -(liked_value)
        if @like.save
            render :show
        else
            render json: @like.errors.full_messages, status: 422
        end
    end

    def destroy
        @like = Like.find_by(id: params[:id])
        @like.destroy
    end

    private
    def likes_params
        params.require(:like).permit(:liked_value, :likeable_id, :likeable_type)
    end

end