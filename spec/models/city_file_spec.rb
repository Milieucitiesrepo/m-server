require 'spec_helper'
require "#{Rails.root}/app/services/url_verifier.rb"

describe CityFile do
  let(:city_file) { create(:city_file) }

  describe '#destroy_if_dead_link' do
    context 'link is dead' do
      before :each do
        allow(Services::UrlVerifier).to receive(:verify_response).and_return(false)
      end

      it 'should destroy record if link cannot be verified' do
        city_file.destroy_if_dead_link

        expect { city_file.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'link is valid' do
      before :each do
        allow(Services::UrlVerifier).to receive(:verify_response).and_return(true)
      end

      it 'should not destroy link if verified' do
        city_file.destroy_if_dead_link

        expect(city_file.reload).to eq(city_file)
      end
    end
  end
end
