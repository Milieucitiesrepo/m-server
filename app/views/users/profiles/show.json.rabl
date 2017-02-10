object @profile

attributes :name, :street, :city, :age_range, :field_of_occupation, :receive_newletter, :postal_code

node :avatar do |profile|
  profile.avatar.web.preview.url if profile.avatar.present?
end

node :avatar_thumb do |profile|
  profile.avatar.web.thumb.url if profile.avatar.present?
end
