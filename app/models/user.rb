class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true
    validates :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    has_many :uploaded_videos,
        primary_key: :id,
        foreign_key: :uploader_id,
        class_name: :Video

    has_many :liked_items,
        primary_key: :id,
        foreign_key: :liker_id,
        class_name: :Like

    has_many :comments,
        primary_key: :id,
        foreign_key: :commenter_id,
        class_name: :Comment
    
    attr_reader :password
    after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user && user.is_password?(password)
        user
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = self.class.generate_session_token
        self.save!
        self.session_token
    end

    private
    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64(16)
    end
end
