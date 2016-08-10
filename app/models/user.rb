class User < ActiveRecord::Base
  rolify
  has_secure_password validations: false

  has_one :profile, dependent: :destroy
  accepts_nested_attributes_for :profile
  has_many :comments, as: :commentable
  
  #omniauth 
  class << self
    def from_omniauth(auth_hash)
      user = find_or_create_by(uid: auth_hash['uid'], provider: auth_hash['provider'])
      #user.id = auth_hash['uid']
      user.name = auth_hash['info']['name']
      user.location = auth_hash['info']['location']
      user.image_url = auth_hash['info']['image']
      user.url = auth_hash['info']['urls'][user.provider.capitalize] 
      user.save!        
      user
    end 
  end

  #fb
  #user.url = auth_hash['info']['urls'][user.provider.capitalize] 

  validates :accepted_terms, acceptance: true
  validates  :email, presence: {message: "Email is required"},
  uniqueness: {message: "Email already in use"}

  validates  :password, presence: {message: "Password is required", on: :create},
  confirmation: {message: "Passwords do not match."},
  length: { in: 6..20, message: "Password must be between 6 to 20 characters"}

end
