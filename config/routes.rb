Rails.application.routes.draw do

  scope ':locale', locale: /en|fr/ do
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


    resources :dev_sites do
      resources :comments, module: :dev_sites do
      end

      member do
        get :images
      end

      collection do
        post :search
        get :geojson
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

  # handles /bad-locale|anything/valid-path
  get '/*locale/*path', to: redirect("/#{I18n.default_locale}/%{path}")

  # handles /anything|valid-path-but-no-locale
  get '/*path', to: redirect("/#{I18n.default_locale}/%{path}"), constraints: lambda { |req| !req.path.starts_with? "/#{I18n.default_locale}/" }

  # handles /
  get '', to: redirect("/#{I18n.locale}")

end
