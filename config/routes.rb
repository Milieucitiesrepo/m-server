# rubocop:disable Metrics/BlockLength
Rails.application.routes.draw do

  root to: 'noumea#index'

  namespace :pages, path: '/', as: nil do
    get :utilisation
    get :participez
  end

  namespace :pages, path: '/participez', as: nil do
    get :survey
    post :submit_survey
  end

  scope '(:locale)', locale: /en|fr/ do

    namespace :pages, path: '/', as: nil do
      get :wakefield
      post :contact_file_lead
      post :contact_councillor
    end

    namespace :legal do
      get :terms_of_use
      get :privacy
    end

    # Omniauth
    namespace :omniauth, path: '/', as: nil do
      get :create, path: 'auth/:facebook/callback'
      get :create, path: 'auth/:twitter/callback'
      get :create, path: 'auth/:google/callback'
    end

    resources :conversations
    resources :newsletter_subscriptions, only: [:create]
    resources :city_requests, only: [:create]
    resources :events
    resources :municipalities, only: [:index]
    resources :comments, only: [:index]
    resources :sessions, only: [:new, :create, :destroy]

    resources :users, param: :slug do
      resource :profile, only: [:edit, :update, :show], module: :users
      resource :notification_setting, only: [:edit, :update, :show], module: :users
      resources :votes, only: [:create, :destroy], module: :users
    end

    resources :dev_sites do
      resources :comments, module: :dev_sites do
        get :approve, to: 'comments#update'
        get :reject, to: 'comments#destroy'
        get :children, to: 'comments#children'
      end
      resources :statuses, only: [:create, :update, :destroy] do
        resources :meetings, only: [:create, :update, :destroy]
        resources :notifications, only: [:create, :update, :destroy], module: :statuses
      end
    end

    resources :organizations, only: [:index, :show, :update, :create, :destroy] do
      resources :memberships, only: [:create, :destroy], module: :organizations
      resources :municipalities, only: [:index, :update, :destroy], module: :organizations
      resources :dev_sites, only: [:index], module: :organizations
    end
  end

  # Backend API Routing
  namespace :api do
    namespace :v1 do
      post '/login', to: 'authentication#authenticate'
      get '/users', to: 'users#show'
      post '/dev_sites/sync', to: 'dev_sites#sync'
      resources :votes, only: [:create, :destroy]
      resources :dev_sites, only: [:index] do
        resources :comments, only: [:index, :show, :create, :update, :destroy], module: :dev_sites
      end
    end
  end

  namespace :custom_surveys do
    post :typeform
  end

  mount Resque::Server, at: '/resque'

  # root to: redirect("/#{I18n.default_locale}", status: 302), as: :redirected_root
  # get '*path' => redirect("/#{I18n.default_locale}", status: 302)
end
