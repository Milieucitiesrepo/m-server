require 'spec_helper'

module Organizations
  describe MembershipsController do
    describe '#create' do
      let(:user) { create(:admin_user) }
      let(:other_user) { create(:user) }
      let(:organization) { create(:organization) }

      before { sign_in user }

      context 'valid params' do
        it 'should add the user to the organization' do
          valid_params = { user: { email: other_user.email } }

          post :create, organization_id: organization.id, membership: valid_params

          expect(response.status).to eq(200)
          expect(organization.users).to include(other_user)
        end
      end

      context 'email is not associated with any user account' do
        it 'should return an error message' do
          invalid_params = { user: { email: 'random@email.com' } }

          post :create, organization_id: organization.id, membership: invalid_params

          result = JSON.parse(response.body)
          expected_message = 'There is no user with this email address'

          expect(response.status).to eq(200)
          expect(result['message']).to eq(expected_message)
        end
      end
    end
  end
end
