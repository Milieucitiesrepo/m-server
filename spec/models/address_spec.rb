require 'spec_helper'

describe Address do
  let(:address) { build(:address) }
  let(:new_address) { create(:address) }

  describe 'model validations' do
    it 'should have a valid factory' do
      expect(address).to be_valid
    end

    context 'when street is not present' do
      before { address.street = '' }
      it { should_not be_valid }
    end
  end

  describe '#new_street?' do
    it 'should return true when street has changed' do
      expect(new_address.new_street?).to be false

      new_address.street = FFaker::AddressCA.street_address

      expect(new_address.new_street?).to be true
    end
  end

  describe '#geocoded' do
    let(:mock_lat_lng) { double('lat_and_lng object') }

    before do
      allow(Geokit::Geocoders::GoogleGeocoder).to receive(:geocode)
        .and_return(mock_lat_lng)
    end

    context 'Geocoder successful' do
      before do
        @expected_lat = 45.444429
        @expected_lng = -75.693875
        allow(mock_lat_lng).to receive(:success).and_return(true)
        allow(mock_lat_lng).to receive(:lat).and_return(@expected_lat)
        allow(mock_lat_lng).to receive(:lng).and_return(@expected_lng)
        new_address.geocoded
      end

      it 'should set lat and lng of address' do
        expect(new_address.lat).to eq(@expected_lat)
        expect(new_address.lon).to eq(@expected_lng)
      end
    end

    context 'Geocoder fails' do
      before do
        allow(mock_lat_lng).to receive(:success).and_return(false)
      end

      it 'should return nil' do
        expect(new_address.geocoded).to be_nil
      end
    end
  end

  describe '#full_address' do
    context 'all attributes are present' do
      it 'should generate a full address with all address attributes' do
        expected_address = "#{new_address.street}, #{new_address.city.strip}, #{new_address.province_state}, #{new_address.country}"
        expect(new_address.full_address).to eq(expected_address)
      end
    end

    context 'missing address attributes' do
      it 'should generate an address string with street missing' do
        incomplete_address = build(:address, street: '')

        expected_address = "#{incomplete_address.city.strip}, #{incomplete_address.province_state}, #{incomplete_address.country}"

        expect(incomplete_address.full_address).to eq(expected_address)
      end

      it 'should generate an address string with city missing' do
        incomplete_address = build(:address, city: '')

        expected_address = "#{incomplete_address.street}, #{incomplete_address.province_state}, #{incomplete_address.country}"

        expect(incomplete_address.full_address).to eq(expected_address)
      end

      it 'should generate an address string with province_state missing' do
        incomplete_address = build(:address, province_state: '')

        expected_address = "#{incomplete_address.street}, #{incomplete_address.city.strip}, #{incomplete_address.country}"

        expect(incomplete_address.full_address).to eq(expected_address)
      end

      it 'should generate an address string with country missing' do
        incomplete_address = build(:address, country: '')

        expected_address = "#{incomplete_address.street}, #{incomplete_address.city.strip}, #{incomplete_address.province_state}"

        expect(incomplete_address.full_address).to eq(expected_address)
      end
    end
  end
end
