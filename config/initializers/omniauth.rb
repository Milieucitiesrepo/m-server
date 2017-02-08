Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :facebook,
    ENV['FACEBOOK_ID'],
    ENV['FACEBOOK_SECRET'],
    scope: 'public_profile,email',
    info_fields: 'id,name,link,email'
  )
end

Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :google_oauth2,
    ENV['GOOGLE_ID'],
    ENV['GOOGLE_SECRET'],
    scope: 'profile,email',
    image_aspect_ratio: 'square',
    image_size: 48,
    access_type: 'online',
    name: 'google'
  )
end
