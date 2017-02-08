require 'spec_helper'

describe UsersController do
  let(:user) { create(:user) }
  let(:admin_user) { create(:admin_user) }

  describe '#index' do
    it 'should return all users as json' do
      sign_in admin_user

      get :index, format: :json

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')
      expect(JSON.parse(response.body)[0]['id']).to eq(admin_user.id)
    end
  end

  describe '#new' do
    it 'should build empty user and profile for user' do
      get :new

      expect(assigns(:user)).to_not be_nil
      expect(assigns(:user).profile).to_not be_nil
    end
  end

  describe '#create' do
    before(:each) do
      @user_attrs = attributes_for(:user)
    end

    it 'should set a session and redirect to the root path when user is saved' do
      post :create, user: @user_attrs, format: :json

      expect(session[:user_id]).to eq(assigns(:user).id)
      expect(response).to redirect_to(root_path)
    end

    it 'should flash errors and render the new template when user is not saved' do
      post :create, user: @user_attrs.except(:email)

      expect(flash[:alert]).to eq('Email is required')
      expect(response).to render_template(:new)
    end
  end

  context 'user is authorized' do
    before :each do
      sign_in user
    end

    describe '#show' do
      it 'should assign no_header to true' do
        get :show, slug: user.slug, format: :json

        expect(assigns(:no_header)).to be true
        expect(response).to render_template(:show)
        expect(response.status).to eq(200)
      end
    end

    describe '#edit' do
      it 'should assign no_header to true' do
        get :edit, slug: user.slug

        expect(assigns(:no_header)).to be true
        expect(response).to render_template(:edit)
        expect(response.status).to eq(200)
      end
    end

    describe '#update' do
      it 'should render show if user updates' do
        user_attrs = { email: 'test@test.com' }

        patch :update, slug: user.slug, user: user_attrs, format: :json

        expect(assigns(:user).email).to eq(user_attrs[:email])
        expect(response).to render_template(:show)
      end

      it 'should return errors as json if user fails to update' do
        invalid_attrs = { email: '' }

        patch :update, slug: user.slug, user: invalid_attrs, format: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    describe '#destroy' do
      it 'should delete current user and session' do
        delete :destroy, slug: user.slug, format: :json

        expect(session[:user_id]).to be_nil
        expect(response).to have_http_status(:ok)
      end
    end
  end

  context 'user is not authorized' do
    let(:user) { create(:user) }

    describe '#show, #edit, #update, #destroy' do
      it 'should redirect to root path if user is not authorized' do
        restricted_actions = [:show, :edit, :update, :destroy]
        restricted_actions.each do |action|
          get action, slug: user.slug

          expect(flash[:alert]).to eq('You are not authorized to access this page.')
          expect(response).to redirect_to(root_path)
        end
      end
    end
  end
end
