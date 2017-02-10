require 'spec_helper'

module Users
  describe ProfilesController do
    let(:profile) { create(:profile) }
    let(:user) { create(:user, profile: profile) }

    context 'user is authorized' do
      before :each do
        sign_in user
      end

      describe '#edit' do
        it 'should set no_header instance variable to true' do
          get :edit, { user_slug: user.slug }, format: :json

          expect(assigns(:no_header)).to be true
          expect(response).to render_template(:edit)
          expect(response.status).to eq(200)
        end
      end

      describe '#update' do
        it 'should render user show template if update successful' do
          profile_attrs = { name: 'David Bowie' }
          patch :update, { user_slug: user.slug, profile: profile_attrs }, format: :json
          
          expect(assigns(:profile).name).to eq(profile_attrs[:name])
          expect(response.status).to eq(200)
          expect(response).to render_template('users/show')
        end

        it 'should render errors as json if update fails' do
          invalid_attrs = { name: '' }
          patch :update, { user_slug: user.slug, profile: invalid_attrs }, format: :json

          expect(JSON.parse(response.body)['name'][0]).to eq('Name is required')
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context 'user is not authorized' do
      it 'should redirect to the root path if the user is not authorized' do
        restricted_actions = [:edit, :update]
        restricted_actions.each do |action|
          get action, user_slug: user.slug

          expect(flash[:alert]).to eq('You are not authorized to access this page.')
          expect(response).to redirect_to(root_path)
        end
      end
    end
  end
end
