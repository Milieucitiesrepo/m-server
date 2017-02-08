require 'spec_helper'

describe DevSitesController do
  let(:dev_site) { create(:dev_site) }
  let(:valid_attributes) { attributes_for(:dev_site) }

  shared_examples('a user who can\'t manage dev sites') do
    describe '#new' do
      it 'denies access' do
        get :new
        expect(response).to redirect_to root_path
      end
    end

    describe '#edit' do
      it 'denies access' do
        get :edit, id: dev_site.id
        expect(response).to redirect_to root_path
      end
    end

    describe '#update' do
      it 'denies access' do
        post :update, id: dev_site.id, dev_site: valid_attributes
        expect(response).to redirect_to root_path
      end
    end

    describe '#create' do
      it 'denies access' do
        post :create, dev_site: valid_attributes
        expect(response).to redirect_to root_path
      end
    end
  end

  shared_examples('a user who can manage dev sites') do
    describe '#new' do
      it 'should instantiate a new dev site with address and status' do
        get :new

        expect(assigns(:dev_site)).to_not be_nil
        expect(assigns(:dev_site).addresses).to_not be_nil
        expect(assigns(:dev_site).statuses).to_not be_nil
        expect(response).to render_template :new
      end
    end

    describe '#edit' do
      it 'grants access and renders edit template' do
        post :edit, id: dev_site.id
        expect(response).to render_template :edit
      end
    end

    describe '#update' do
      context 'request in html format' do
        it 'redirects to dev site if site updated' do
          patch :update, id: dev_site.id, dev_site: valid_attributes
          expect(response).to redirect_to dev_site
        end

        it 'renders edit if update fails' do
          patch :update, id: dev_site.id, dev_site: { description: '' }

          expect(response).to render_template(:edit)
        end
      end

      context 'request in json format' do
        it 'renders show template if site updated' do
          patch :update, id: dev_site.id, dev_site: valid_attributes, format: :json

          expect(response.location).to eq(dev_site_url(assigns(:dev_site)))
          expect(response).to render_template(:show)
          expect(response).to have_http_status(:accepted)
        end

        it 'renders errors as json if update fails' do
          patch :update, id: dev_site.id, dev_site: { description: '' }, format: :json

          expect(JSON.parse(response.body)['description']).to_not be_nil
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    describe '#create' do
      context 'request in html format' do
        it 'redirects to dev_site show template if saved' do
          post :create, dev_site: valid_attributes

          new_dev_site = assigns(:dev_site)
          expect(new_dev_site.description).to eq(valid_attributes[:description])
          expect(response).to redirect_to(new_dev_site)
        end

        it 'renders new template with alert if save fails' do
          post :create, dev_site: valid_attributes.except(:description)

          expect(response).to render_template(:new)
        end
      end

      context 'request in json format' do
        it 'renders show template if saved' do
          post :create, dev_site: valid_attributes, format: :json

          new_dev_site = assigns(:dev_site)
          expect(new_dev_site.description).to eq(valid_attributes[:description])
          expect(response.location).to eq(dev_site_url(new_dev_site))
          expect(response).to render_template(:show)
          expect(response).to have_http_status(:created)
        end

        it 'returns errors as json if save fails' do
          post :create, dev_site: valid_attributes.except(:description), format: :json

          expect(JSON.parse(response.body)['description']).to_not be_nil
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    describe '#destroy' do
      context 'html request' do
        it 'should delete the dev site and redirect to dev_sites_path' do
          delete :destroy, id: dev_site.id

          expect { dev_site.reload }.to raise_error(ActiveRecord::RecordNotFound)
          expect(response).to redirect_to(dev_sites_path)
        end
      end

      context 'json request' do
        it 'should delete the dev site and return no content status' do
          delete :destroy, id: dev_site.id, format: :json

          expect { dev_site.reload }.to raise_error(ActiveRecord::RecordNotFound)
          expect(response.message).to eq('No Content')
        end
      end
    end
  end

  shared_examples('a user who can view dev sites') do
    describe '#index' do
      before :each do
        @mock_results = (1..3).collect { create(:dev_site) }
        @mock_dev_site = class_double('DevSite')
        allow(DevSite).to receive(:includes).and_return(@mock_results)
        allow(DevSite).to receive(:count).and_return(@mock_results.count)
      end

      it 'returns all dev sites when no params are passed' do
        allow(@mock_results).to receive(:limit!).and_return(@mock_results)
        allow(@mock_results).to receive(:offset!).and_return(@mock_results)

        get :index

        expect(assigns(:dev_sites)).to eq(@mock_results)
        expect(assigns(:no_header)).to be true
        expect(assigns(:total)).to eq(@mock_results.count)
        expect(response).to render_template :index
      end

      it 'returns search result when search query present in params' do
        search_result = [@mock_results[0]]
        expect(@mock_results).to receive(:search).and_return(search_result)
        allow(search_result).to receive(:limit!).and_return(search_result)
        allow(search_result).to receive(:offset!).and_return(search_result)

        get :index, year: '2016'

        expect(assigns(:dev_sites)).to eq(search_result)
        expect(assigns(:total)).to eq(search_result.count)
        expect(assigns(:no_header)).to be true
        expect(response).to render_template :index
      end
    end

    describe '#show' do
      it 'grant access' do
        get :show, id: dev_site.id
        expect(response).to render_template :show
      end
    end
  end

  context 'when signed in as a regular user' do
    before :each do
      sign_in create(:user)
    end

    it_behaves_like 'a user who can\'t manage dev sites'
    it_behaves_like 'a user who can view dev sites'
  end

  context 'when signed in as an admin user' do
    before :each do
      sign_in create(:admin_user)
    end

    it_behaves_like 'a user who can manage dev sites'
    it_behaves_like 'a user who can view dev sites'
  end
end
