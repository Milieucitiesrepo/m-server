require 'spec_helper'

describe User do
  let(:user) { build_stubbed(:user) }

  subject { user }

  it { should respond_to(:email) }
  it { should respond_to(:password) }
  it { should respond_to(:password_confirmation) }
  it { should be_valid }

  describe 'when email is not present' do
    before { user.email = '' }
    it { should_not be_valid }
  end

  describe 'when passwords do not match' do
    before { user.password = '1', user.password_confirmation = '2' }
    it { should_not be_valid }
  end

  describe 'friendly id slug methods' do
    let(:new_user) { create(:user) }

    describe '#email_mailbox' do
      it 'should return email mailbox' do
        expected_slug = new_user.email.split('@')[0].to_s

        expect(new_user.email_mailbox).to eq(expected_slug)
      end
    end

    describe '#name_from_profile' do
      it 'should return the correct name' do
        expect(new_user.name_from_profile).to eq(new_user.profile.name)
      end
    end

    describe '#name_and_id' do
      it 'should concatenate the user name and id' do
        expected_slug = "#{new_user.profile.name}-#{new_user.id}"

        expect(new_user.name_and_id).to eq(expected_slug)
      end
    end
  end
end
