require 'spec_helper'
require "#{Rails.root}/app/services/url_verifier.rb"

module Services
  describe UrlVerifier do
    let(:test_url) { 'www.milieu.io' }

    describe '#verify_response' do
      context 'no expected response code provided' do
        it 'should return true if the response code is 200' do
          mock_response = double('response', code: 200)
          allow(HTTParty).to receive(:get).and_return(mock_response)

          result = UrlVerifier.verify_response(test_url)
          expect(result).to be true
        end

        it 'should return false if the response code is not 200' do
          mock_response = double('response', code: 403)
          allow(HTTParty).to receive(:get).and_return(mock_response)

          result = UrlVerifier.verify_response(test_url)
          expect(result).to be false
        end
      end

      context 'expected response code passed in' do
        it 'should return true if the response code matches the expected response code' do
          mock_response = double('response', code: 302)
          allow(HTTParty).to receive(:get).and_return(mock_response)

          result = UrlVerifier.verify_response(test_url, 302)
          expect(result).to be true
        end

        it 'should return false if the response code does not match the expected one' do
          mock_response = double('response', code: 500)
          allow(HTTParty).to receive(:get).and_return(mock_response)

          result = UrlVerifier.verify_response(test_url, 200)
          expect(result).to be false
        end
      end
    end
  end
end
