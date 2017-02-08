# rubocop:disable Metrics/BlockLength
Rails.application.routes.draw do
  scope '(:locale)', locale: /en|fr/ do
    root to: 'pages#home'

    namespace :pages, path: '/', as: nil do
      post 'contact_citizencity'
      post 'contact_milieu'
      post 'contact_file_lead'
      post 'contact_councillor'
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
    resources :dev_sites do
      resources :comments, module: :dev_sites
    end

    resources :events

    resources :comments, only: [:index]
    resources :users, param: :slug do
      resource :profile, only: [:edit, :update, :show]
      resource :notification, only: [:edit, :update, :show]
      resources :votes, only: [:create, :destroy]
    end
    resources :sessions, only: [:new, :create, :destroy]
  end

  # Backend API Routing
  namespace :api do
    namespace :v1 do
      post '/login', to: 'authentication#authenticate'
      #Authentication Example
      resources :dev_sites, only: [:index]
    end
  end

  mount Resque::Server, at: '/resque'

  root to: redirect("/#{I18n.default_locale}", status: 302), as: :redirected_root
  get '*path' => redirect("/#{I18n.default_locale}", status: 302)
end
