class Video < ApplicationRecord
    validates :title, :uploader_id, presence: true

    # validate :ensure_video_exist

    has_one_attached :video
    

    belongs_to :uploader,
        primary_key: :id,
        foreign_key: :uploader_id,
        class_name: :User

    # def ensure_video_exist
    #     errors[:video] << "There is no video attached" unless self.video.attached?
    # end
    

end