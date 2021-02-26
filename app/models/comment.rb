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

end

