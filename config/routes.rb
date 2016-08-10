Rails.application.routes.draw do

  scope '(:locale)', locale: /en|fr/ do
    root to: 'static_pages#home'

    namespace :static_pages, path: '/', as: nil do
      get 'map'
      get 'citizencity'
      get 'tos'
      get 'privacy'
      get 'about'
      post 'contact_citizencity'
      post 'contact_milieu'
      post 'contact_file_lead'
      post 'contact_councillor'
    end

    #omniauth 
    #get 'auth/facebook', as: "auth_provider"
    get 'auth/:facebook/callback', to: 'sessions#create'
    get 'auth/:twitter/callback', to: 'sessions#create'
    get 'auth/:google/callback', to: 'sessions#create'

    
    resources :dev_sites do
      resources :comments, module: :dev_sites do
      end

      member do
        get :images
      end

      collection do
        post :search
        get :geojson
        get :map
      end
    end

    resources :events do
      resources :comments, module: :events do
      end

      member do
        get :images
      end

      collection do
        get :geojson
      end
    end

    resources :comments, only: [:index]
    resources :users, only: [:index, :new, :create, :destroy]
    resources :sessions, only: [:new, :create, :destroy]

  end

  root to: redirect("/", status: 302), as: :redirected_root
  get '*path' => redirect("/", status: 302)

end
