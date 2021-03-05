class Comment < ApplicationRecord
    validates :commenter_id, :video_id, :content, presence: true

    belongs_to :video

    belongs_to :commenter,
        foreign_key: :commenter_id,
        class_name: :User

    has_many :replies,
        foreign_key: :parent_comment_id,
        class_name: :Comment,
        dependent: :destroy

    has_many :likes, as: :likeable

    def is_edited?
        self.created_at != self.updated_at
    end

    def replies_ids
        self.replies.map { |el| el.id}
    end

    def liker_ids
        self.likes.where(is_like: 1).select(:liker_id).map {|el| el.liker_id}
    end

    def disliker_ids
        self.likes.where(is_like: -1).select(:liker_id).map {|el| el.liker_id}
    end

end

