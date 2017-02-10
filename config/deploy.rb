# config valid only for current version of Capistrano
lock '3.7.1'

set :repo_url, 'git@github.com:Milieucitiesrepo/m-server.git'
set :application, 'm-server'
set :deploy_to, "/home/rails/#{fetch(:application)}"
set :use_sudo, false
set :deploy_via, :remote_cache
set :ssh_options, { forward_agent: true }
set :keep_releases, 5
set :rvm_ruby_version, '2.3.0'
set :pty, true
set :npm_target_path, -> { release_path.join('app', 'client') }
set :npm_flags, '--production --silent --no-progress'
set :linked_dirs, fetch(:linked_dirs, []).push('app/client/node_modules')
set :linked_files, fetch(:linked_files, []).push('config/database.yml')
set :resque_environment_task, true

namespace :npm do
  task :start do
    on roles(:app) do
      within release_path do
        execute :npm, :start, '--silent' ,'--no-progress'
      end
    end
  end
end

namespace :unicorn do
  task :restart do
    on roles(:web) do
      execute :service, :unicorn, :restart
    end
  end
end

after 'npm:install', 'npm:start'
after 'deploy:published', 'unicorn:restart'
after 'deploy:published', 'resque:restart'
