object @user

  attributes :id, :provider, :email

child :profile do
  attributes :id, :name, :bio, :anonymous_comments, :web_presence, :organization, :community_role, :verification_status

  node :avatar do |profile|
    profile.avatar.web.preview.url if profile.avatar.present?
  end
end

child :address do
  attributes :id, :street, :city
end

child :comments do
  attributes :id, :body, :last_posted
end
