require 'spec_helper'

describe SessionsController do

  let(:user)     {create(:user)}
  let(:valid_attributes) { attributes_for(:user) }

  context "when signed in as a user" do
    before :each do
      sign_in create(:user)
    end

    describe "POST #create" do
      it "create session user id for user" do
        post :create, { session: valid_attributes, locale: :en }
        expect(session[:user_id].present?).to be_truthy
      end
     end
  end

end
