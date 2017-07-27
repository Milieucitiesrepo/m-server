source 'https://rubygems.org'

gem 'rails', '4.2.5.1'

# rails core gems
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails', '~> 4.1.0'
gem 'jquery-turbolinks', '~> 2.1.0'
gem 'turbolinks', '~> 5.0.0'
gem 'rack-cors', '~> 0.4.0'
gem 'rails-api', require: 'rails-api/action_controller/api'
gem 'httparty'
gem 'figaro'

# background services gems
gem 'whenever'
gem 'resque', '~> 1.26.0', require: 'resque/server'
gem 'mandrill-api', '~> 1.0.53'

# model gems
gem 'carrierwave', '~> 1.0.0'
gem 'rolify', '~> 5.1.0'
gem 'friendly_id', '~> 5.1.0'
gem 'cancancan', '~> 1.15.0'
gem 'geokit-rails'
gem 'bcrypt', '~> 3.1.11'
gem 'fog', '~> 1.38'
gem 'rmagick', '~> 2.15.4'
gem 'simple_command'
gem 'jwt'
gem 'closure_tree', '~> 6.5.0'
gem 'textacular', '~> 4.0'

# view gems
gem 'font-awesome-rails', '~> 4.7.0.0'
gem 'momentjs-rails', '~> 2.11.0'
gem 'rabl', '~> 0.12.0'
gem 'cocoon'

# database gems
gem 'pg', '~> 0.18.4'
gem 'redis', '~> 3.2.2'

# omniauth gems
gem 'therubyracer'
gem 'omniauth'
gem 'omniauth-twitter'
gem 'omniauth-facebook'
gem 'omniauth-google-oauth2'

group :development do
  gem 'capistrano', '3.7.1', require: false
  gem 'capistrano-npm', '~> 1.0.2', require: false
  gem 'capistrano-rails', '~> 1.2.2', require: false
  gem 'capistrano-rvm', '~> 0.1.2', require: false
  gem 'capistrano-bundler', '~> 1.2.0', require: false
  gem 'capistrano-resque', '~> 0.2.2', require: false
  gem 'pry-rails'
  gem 'spring'
  gem 'letter_opener'
  gem 'dotenv-rails', '~> 2.1.1'
  gem 'puma'
  gem 'better_errors'
  gem 'foreman'
  gem 'rubocop', '~> 0.46.0', require: false
end

group :test do
  gem 'dotenv-rails', '~> 2.1.1'
  gem 'ffaker'
  gem 'rspec-rails', '~> 3.3'
  gem 'factory_girl_rails', '~> 4.2.1'
  gem 'shoulda-matchers'
  gem 'minitest-reporters', '~> 1.1.8'
  gem 'mini_backtrace', '0.1.3'
end

group :production, :staging do
  gem 'unicorn', '5.1.0'
  gem 'puma'
end

ruby '2.3.0'
