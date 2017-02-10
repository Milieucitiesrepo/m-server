require 'spec_helper'

describe OrganizationsController do
  let(:admin_user) { create(:admin_user) }
  let(:other_user) { create(:user) }
  let(:organization) { create(:organization) }

  context 'user is authorized' do
    before :each do
      sign_in admin_user
    end

    describe '#index' do
      before :each do
        @org1 = create(:organization)
        @org2 = create(:organization)
      end

      it 'should render index template for html request' do
        get :index

        expect(assigns(:organizations)).to eq([@org1, @org2])
        expect(response).to render_template(:index)
      end

      it 'should render index template for json request' do
        get :index, format: :json

        expect(assigns(:organizations)).to eq([@org1, @org2])
        expect(response).to render_template(:index)
      end
    end

    describe '#show' do
      it 'should return organization members as json' do
        get :show, id: organization.id, format: :json

        expect(assigns(:organization)).to eq(organization)
        expect(response).to render_template(:show)
      end
    end

    describe '#create' do
      let(:valid_params) { attributes_for(:organization) }

      context 'valid params' do
        it 'should create organization with current user as admin' do
          post :create, organization: valid_params, format: :json

          expect(response.status).to eq(201)
          expect(assigns(:organization).name).to eq(valid_params[:name])
        end
      end

      context 'invalid params' do
        it 'should return the error message' do
          post :create, organization: { name: '' }, format: :json

          expect(response.status).to eq(422)
        end
      end
    end

    describe '#destroy' do
      it 'should delete the organization' do
        delete :destroy, id: organization.id, format: :json

        expect { organization.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  context 'user is not authorized' do
    before do
      sign_in other_user
    end

    it '#index should redirect to root path when html request' do
      get :index

      expect(response).to redirect_to(root_path)
    end

    it '#index should redirect to root path when json request' do
      get :index, format: :json

      expect(response.status).to eq(403)
    end

    it '#show should return unauthorized status' do
      get :show, id: organization.id, format: :json

      expect(response.status).to eq(403)
    end

    it '#create should return unauthorized status' do
      params = attributes_for(:organization)

      post :create, organization: params, format: :json

      expect(response.status).to eq(403)
    end

    it '#destroy should return unauthorized status' do
      delete :destroy, id: organization.id, format: :json

      expect(response.status).to eq(403)
    end
  end
end
