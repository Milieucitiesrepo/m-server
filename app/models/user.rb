class User < ActiveRecord::Base
  has_secure_password validations: false

  # THIS ARRAY MUST BE IN ORDER BY EACH WARDS, WARD NUMBER
  VALID_NEIGHBOURHOOD_TYPES = [ "Orleans", "Innes", "Barrhaven", "Kanata North",
    "West Carleton-March", "Stittsville", "Bay", "College", "Knoxdale-Merivale",
    "Gloucester-Southgate", "Beacon Hill-Cyrville", "Rideau-Vanier", "Rideau-Rockcliffe",
    "Somerset", "Kitchissippi", "River", "Capital", "Alta Vista", "Cumberland", "Osgoode",
    "Rideau-Goulbourn", "Gloucester-South Nepean", "Kanata South"]

  VALID_ROLE_TYPES = ["Public", "City Official", "Organization", "Urban Developer"]

  before_create do |doc|
    doc.api_key = doc.generate_api_key
  end

  has_many :comments, as: :commentable

  validates               :email,
                            presence: {message: "Email is required"},
                            uniqueness: {message: "Email already in use"}
  validates               :password,
                            presence: {message: "Password is required", on: :create},
                            confirmation: {message: "Passwords do not match."},
                            length: { in: 6..20, message: "Password must be between 6 to 20 characters"}
  validates               :username,
                            presence: {message: "Username is required"}


  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  def generate_api_key
    loop do
      token = SecureRandom.base64.tr('+/=', 'Qrt')
      break token unless User.exists?(api_key: token)
    end
  end

  def self.create_with_omniauth(auth)
    user = new do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      if auth['info']
         user.first_name = auth['info']['name'].split[0] || ""
         user.last_name = auth['info']['name'].split[1] || ""
         user.email = auth['info']['email'] || ""
      end
    end
    user.save!(:validate => false)
    user
  end
end
