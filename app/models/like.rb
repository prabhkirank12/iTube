class Like < ApplicationRecord
    validates :likeable_id, :likeable_type, :liker_id, :liked_value, presence: true
    validates :liked_value, inclusion: { in: [1, -1]}
    
    belongs_to :likeable, polymorphic: true
    belongs_to :liker,
        primary_key: :id,
        foreign_key: :liker_id,
        classname: :User

end