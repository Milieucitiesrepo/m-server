set :branch, :production
set :rails_env, :production
server 'milieu.io', roles: [:web, :app, :db, :resque_worker], user: :rails, primary: true
