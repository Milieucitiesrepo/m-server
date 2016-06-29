Rails.application.routes.draw do

  scope "/:locale", locale: /en|fr/ do
    root to: 'static_pages#home'

    get 'map', to: 'static_pages#map'
    get '/citizencity', to: 'static_pages#citizencity'

    resources :comments, only: [:index]

    resources :dev_sites do
      resources :comments, module: :dev_sites do
        member do
          put "upvote", to: "comments#upvote"
          put "downvote", to: "comments#downvote"
        end
      end

      get :geojson, on: :collection
      get :images, on: :member

      collection do
        post :search
      end

      # Voting
      member do
        put "upvote", to: "dev_sites#upvote"
        put "downvote", to: "dev_sites#downvote"
      end

    end

    resources :projects
    resources :events do
      resources :comments, module: :events do
        member do
          put "upvote", to: "comments#upvote"
          put "downvote", to: "comments#downvote"
        end
      end
      get :images, on: :member
      get :geojson, on: :collection
    end

    post '/survey', to: 'static_pages#submitSurvey'
    post '/citizensurvey', to: 'static_pages#submitSurveyCitizen'

    post '/contact_citizencity', to: 'static_pages#contact_citizencity'
    post '/contact_milieu', to: 'static_pages#contact_milieu'
    post '/contact_file_lead', to: 'static_pages#contact_file_lead'
    post '/contact_councillor', to: 'static_pages#contact_councillor'

    # Add about page route
    get 'about', to: 'static_pages#about'

    resources :users
    resources :sessions, only: [:new, :create, :destroy]

    ##############################
    ### INTERNAL API ENDPOINTS ###
    ##############################

    namespace :api, defaults: {format: :json} do
      namespace :v1 do
        ## USER REGISTRATIONS ##
        resources :registrations, only: [:create, :destroy, :index, :show]

        ## SESSIONS ##
        namespace :sessions, path: '/', as: nil do
          post :login_authentication
          get  :login
          get  :logout
        end

        ## EVENTS ##
        resources :events

        ## DEV SITES ##
        resources :dev_sites

        scope module: :maps do
          # Ottawa Map
          get 'ottawamap', to: 'ottawa_map#map'
          get 'loadWards', to: 'ottawa_map#loadGeoJsonData'
          get 'loadMarkers', to: 'ottawa_map#loadMarkers'
        end
      end
    end
  end

  #omniauth
  get '/auth/:provider/callback', to: 'sessions#create'

  root to: redirect("/#{I18n.default_locale}", status: 302), as: :redirected_root

  # get "/*path", to: redirect("/#{I18n.default_locale}/%{path}", status: 302), constraints: {path: /(?!(#{I18n.available_locales.join("|")})\/).*/}, format: false

  # if Rails.env.production?
  get '*path' => redirect("/#{I18n.default_locale}", status: 302)
  # end

end
