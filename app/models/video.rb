class Video < ApplicationRecord
    validates :title, :uploader_id, presence: true

    has_one_attached :video
    
    has_many :likes, as: :likeable, dependent: :destroy

    has_many :comments, dependent: :destroy

    belongs_to :uploader,
        primary_key: :id,
        foreign_key: :uploader_id,
        class_name: :User


    def likers
        self.likes.where(liked_value: 1).select(:liker_id).map{|ele| ele.liker_id}
    end

    def dislikers
        self.likes.where(liked_value: -1).select(:liker_id).map{|ele| ele.liker_id}  
    end
end