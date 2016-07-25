require 'spec_helper'

describe DevSitesController, type: :controller do
  let(:dev_site)     {create(:dev_site)}
  let(:valid_attributes) { attributes_for(:dev_site) }

  shared_examples("a user who can't manage dev sites") do
    describe "GET #new" do
      it "denies access" do
        get :new, { locale: :en }
        expect(response).to redirect_to root_path
      end
    end

    describe "GET :edit" do
      it "denies access" do
        get :edit, { id: dev_site.id, locale: :en }
        expect(response).to redirect_to root_path
      end
    end

    describe "POST :update" do
      it "denies access" do
        post :update, {id: dev_site.id, dev_site: valid_attributes, locale: :en }
        expect(response).to redirect_to root_path
      end
    end

    describe "POST :create" do
      it "denies access" do
        post :create, {dev_site: valid_attributes, locale: :en }
        expect(response).to redirect_to root_path
      end
    end
  end

  shared_examples("a user who can manage dev sites") do
    describe "GET #new" do
      it "grant access" do
        get :new, { locale: :en }
        expect(response).to render_template :new
      end
    end

    describe "GET :edit" do
      it "grant access" do
        post :edit, {id: dev_site.id, locale: :en }
        expect(response).to render_template :edit
      end
    end

    describe "POST :update" do
      it "grant access" do
        post :update, {id: dev_site.id, dev_site: valid_attributes, locale: :en }
        expect(response.status).to redirect_to dev_site
      end
    end

    describe "POST :create" do
      it "grant access" do
        expect {
          post :create, {dev_site: valid_attributes, locale: :en }
        }.to change(DevSite, :count).by(1)
      end
    end
  end

  shared_examples("a user who can view dev sites") do
    describe "GET #index" do
      it "grant access" do
        get :index, { locale: :en }
        expect(response).to render_template :index
      end
    end

    describe "GET #show" do
      it "grant access" do
        get :show, {id: dev_site.id, locale: :en }
        expect(response).to render_template :show
      end
    end
  end

  context "when signed in as a regular user" do
    before :each do
      sign_in create(:user)
    end

    it_behaves_like "a user who can't manage dev sites"
    it_behaves_like "a user who can view dev sites"
  end


  context "when signed in as an admin user" do
    before :each do
      sign_in create(:admin_user)
    end

    it_behaves_like "a user who can manage dev sites"
    it_behaves_like "a user who can view dev sites"
  end

end
