require 'spec_helper'

describe Profile do
  let(:new_profile) { build(:profile) }

  describe 'model validations' do
    it 'should have a valid factory' do
      expect(new_profile).to be_valid
    end

    context 'verification not requested' do
      it 'should validate presence of name' do
        new_profile.update(name: '')

        expect(new_profile).to_not be_valid
      end

      it 'should validate acceptance of ToRs' do
        new_profile.update(accepted_terms: false)

        expect(new_profile).to_not be_valid
      end
    end

    context 'verification requested' do
      before :each do
        new_profile.update(verification_status: 'pendingVerification')
      end

      it 'should validate presence of required fields' do
        required_fields = [:organization, :community_role, :bio]
        required_fields.each do |field|
          new_profile.update_attributes(field => '')
          expect(new_profile).to_not be_valid
        end
      end
    end
  end

  describe '#verification_requested?' do
    it 'should return true when verification status is pendingVerification' do
      expect(new_profile.verification_requested?).to be false

      new_profile.update(verification_status: 'pendingVerification')

      expect(new_profile.verification_requested?).to be true
    end
  end

  describe '#send_verification_mailer' do
    before do
      @user = create(:user, profile: new_profile)
    end

    it 'should send request_role_verification mailer with user object' do
      mock_mailer = double('VerificationMailer')
      expect(VerificationMailer).to receive(:request_role_verification)
        .with(@user)
        .and_return(mock_mailer)
      allow(mock_mailer).to receive(:deliver_now)

      new_profile.send_verification_mailer
    end
  end
end
