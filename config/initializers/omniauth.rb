#facebook
Rails.application.config.middleware.use OmniAuth::Builder do
	provider :facebook, SOCIAL_CONFIG['fb_id'], SOCIAL_CONFIG['fb_secret'],
		scope: 'public_profile', info_fields: 'id,name,link'
end
#google 
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, SOCIAL_CONFIG['g_id'], SOCIAL_CONFIG['g_secret'],   
  scope: 'profile', image_aspect_ratio: 'square', image_size: 48, access_type: 'online', name: 'google'
  #{client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}	
end
 
#twitter
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, SOCIAL_CONFIG['tt_id'], SOCIAL_CONFIG['tt_secret']
end
