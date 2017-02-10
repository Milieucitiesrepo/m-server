set :branch, :staging
set :rails_env, :staging
server '138.197.159.128', roles: [:web, :app, :db, :resque_worker], user: :root, primary: true
